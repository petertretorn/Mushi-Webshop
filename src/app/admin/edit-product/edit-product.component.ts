import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { ProductService } from '@app/core/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import * as  firebase from 'firebase';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  file: File;
  private basePath = '/images';
  product: Product = new Product();

  isNew: Boolean = false

  heading: string = ''

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id === 'new') this.isNew = true
    else this.fetchProduct(id)

    this.heading = (this.isNew) ? 'Ny vare' : 'Ret oplysninger'
  }

  fetchProduct(id) {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product
      this.product.id = id
    })
  }

  saveProduct() {
    if (this.isNew) {
      this.productService.saveProduct(this.product).then(() => {
        this.openSnackbar('Ny vare er gemt')
        this.router.navigate(['admin/products-list'])
      })
    } else {
      this.productService.updateProduct(this.product).then(() => {
        this.openSnackbar('Rettelser er gemt')
        this.router.navigate(['admin/products-list'])
      })
    }

  }

  handleFile(event) {
    console.log('event: ' + event)
    this.file = event.target.files[0]
    console.log('name: ' + this.file.name)
  }

  uploadFile() {
    this.uploadFileToStorage(this.file)
  }

  uploadFileToStorage(upload: File) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.name}`)
      .put(upload);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // three observers
      // 1.) state_changed observer
      (snapshot) => {
        // upload in progress
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('progress: ' + progress);
      },
      // 2.) error observer
      (error) => {
        // upload failed
        console.log(error);
      },
      // 3.) success observer
      (): any => {
        var url = uploadTask.snapshot.downloadURL;
        var name = upload.name;
        this.saveFileData( { url, name });
      }
    );
  }

  private saveFileData(data) {
    console.log('File saved!: ' + data.url, data.name);
  }
  /* private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log('File saved!: ' + upload.url);
  }
 */
  openSnackbar(message: string) {
    this.snackBar.open(message, 'SUCCES', { duration: 700 })
  }
}
