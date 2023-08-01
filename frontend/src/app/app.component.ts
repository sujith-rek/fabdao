import { Component , OnInit} from '@angular/core';
import { ParentService, Parent } from './services/parent.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DAOFAB';

  constructor( private parentService: ParentService ){}

  pageData: any;

  ngOnInit(): void {
    this.parentService.getPage(1).subscribe((data: any) => {
      this.pageData = data;
      console.log(this.pageData);
    }
    );
  }

}
