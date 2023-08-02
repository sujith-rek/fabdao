import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ParentService } from '../services/parent.service';

/**
 * This component is used to display the child data of a parent.
 */
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  id : string = ''; // id of parent

  data: any = []; // child data that will be fetched from backend and then displayed
  parent: any = []; // Parent data

  /**
   * 
   * @param route used to get the id of the parent from the url
   * @param parentService used to fetch the data from the backend
   */
  constructor(
    private route: ActivatedRoute,
    private parentService: ParentService
  ) {}

  /**
   * This method is called when the component is initialized,
   * whenever params change, or page is refreshed/reloaded.
   * 
   * It fetches the id of the parent from the url, and then
   * uses that id to fetch the data of the parent and its children
   */
  ngOnInit() : void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id');
    });
    this.parentService.getChild(parseInt(this.id)).subscribe((data: any) => {
      this.data = data.data;
      this.parent = data.parent;
    });
  }

}
