import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ParentService } from '../services/parent.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  id : string = '';

  data: any = [];
  parent: any = [];

  constructor(
    private route: ActivatedRoute,
    private parentService: ParentService
  ) {}

  ngOnInit() : void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id');
    });
    this.parentService.getChild(parseInt(this.id)).subscribe((data: any) => {
      this.data = data.data;
      this.parent = data.parent;
      console.log(this.parent);
    }
    );
  }

}
