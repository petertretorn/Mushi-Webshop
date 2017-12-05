import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import * as  firebase from 'firebase';
import { FileService } from '@app/core/file.service';
import { CategoryService } from '@app/core/category.service';
import { Category } from '@app/models/category.model';
import { Link } from '@app/models/link.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  link: Link = new Link()

  uploadInProgress: Boolean
  file: File;
  product: Product = new Product();

  isNew: Boolean = false

  heading: string = ''

  categories: Category[] = []

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fileService: FileService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id === 'new') this.isNew = true
    else this.fetchProduct(id)

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
    })

    this.heading = (this.isNew) ? 'Ny vare' : 'Ret oplysninger'
  }

  fetchProduct(id) {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product
      this.product.id = id
      this.product.links = this.product.links || []
    })
  }

  saveProduct() {
    if (this.isNew) {
      this.productService.saveProduct(this.product).then(() => {
        this.openSnackbar('Ny vare er gemt')
        this.router.navigate(['admin/products-list'])
      })
    } else {
      console.log('category: ' + this.product.categoryId)
      this.productService.updateProduct(this.product).then(() => {
        this.openSnackbar('Rettelser er gemt')
        this.router.navigate(['admin/products-list'])
      })
    }
  }
  
  addLink() {
    this.product.links.push(this.link)
    this.link = new Link()
  }

  deleteLink(link: Link) {
    const index = this.product.links.indexOf(link)
    this.product.links.splice(index, 1)
  }

  handleFile(event) {

    if (!!this.product.imageUrl) {
      this.fileService.deleteFile(this.product.imageUrl)
    }

    let file = event.target.files[0]
    const name = file.name + new Date().getTime();

    file = new File([file], name, { type: file.type });

    this.uploadInProgress = true

    this.fileService.uploadFileToStorage(file).then(res => {
      this.product.imageUrl = res.metadata.downloadURLs[0]
      this.uploadInProgress = false
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'SUCCES', { duration: 1000 })
  }
}
