import { Component, OnInit } from '@angular/core';
import { ParentService } from '../services/parent.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  constructor(private parentService: ParentService) { }

  page: number = 1;
  total: number = 2;

  data: any = [];

  ngOnInit(): void {
    this.parentService.getPage(this.page).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.total;
    }
    );
  }
  renderPage(page: number): void {
    this.page = page;
    this.parentService.getPage(this.page).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.total;
    }
    );
  }

  gotoChild(id: number): void {
    window.location.href = "/child/" + id;
  }

}
