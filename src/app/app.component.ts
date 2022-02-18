import { Component,OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  freshness = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  prod:any;
  title = 'angular';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiService:ApiService) {}

  ngOnInit(): void{
     this.getData();
  }

  openDialog() {
    this.dialog.open(DialogComponent ,{
      width:'30%',

    });
  }
  getData(){
    this.apiService.getProduct().subscribe((e)=>{
       this.prod = e;
      console.log(this.prod);
    });
  }
  deleteProduct(id:any){
     this.apiService.DeleteProduct(id).subscribe((e)=>
        console.log('product deleted successfully '),
        (err)=>alert('Error: '+err.error.error)
      );
  }


  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.prod.filter = filterValue.trim().toLowerCase();

    if(this.prod.paginator){
      this.prod.paginator.firstPage();
    }
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  updateProduct(){

  }
}
