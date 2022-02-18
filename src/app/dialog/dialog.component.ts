import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshness = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  prod:any;
  constructor(private formBuilder: FormBuilder, private apiService:ApiService, private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      category : ['',Validators.required],
      freshness: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',Validators.required],
      date: ['',Validators.required]
    });

  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  addProduct(){
   if(this.productForm.valid){
    this.apiService.addProduct(this.productForm.value).subscribe({
      next:(res)=>{
       alert('Product Added Successfully');
       this.productForm.reset();
       this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error While Adding Product");
      }

    });
    window.location.reload();
   }

  }

}
