import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ParentService, Child, PrimitiveParent } from '../services/parent.service';

/**
 * This component is used to display the child data of a parent.
 */
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  id: string = ''; // id of parent
  loading: boolean = false; // loading state
  icon: boolean = false; // icon state
  ascendant: boolean = true; // ascendant state

  data: Child[] = []; // data to be displayed in the table
  parent: PrimitiveParent = {
    id: 0,
    sender: '',
    receiver: '',
    totalAmount: 0
  }; // parent data that will be fetched from backend and then displayed

  /**
   * 
   * @param route used to get the id of the parent from the url
   * @param parentService used to fetch the data from the backend
   */
  constructor(
    private route: ActivatedRoute,
    private parentService: ParentService
  ) { }

  /**
   * This method is called when the component is initialized,
   * whenever params change, or page is refreshed/reloaded.
   * 
   * It fetches the id of the parent from the url, and then
   * uses that id to fetch the data of the parent and its children
   */
  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id += params.get('id');
    });
    this.parentService.getChild(parseInt(this.id)).subscribe((data: any) => {
      this.data = data.data;
      this.parent = data.parent;
      this.loading = false;
    });
  }

  /**
   * 
   * @param column the column to be sorted
   * 
   * This method is called when the user clicks on a column header.
   * It sorts the data in the table according to the column clicked.
   * If the column is clicked again, the sort order is reversed.
   * 
   * The data is sorted in ascending order by default.
   * 
   * implemented using data.sort() and the compare function
   * which returns -1, 0, or 1 depending on the comparison.
   *
   */
  sortData(column: string): void {
    this.data = [...this.data.sort((a: any, b: any) => {
      let result = 0;
      if (a[column] < b[column]) result = -1;
      else if (a[column] > b[column]) result = 1;
      else result = 0;
      return this.ascendant ? result : (result * -1);
    })];

    this.ascendant = !this.ascendant;
    if (!this.icon) this.icon = true;
  }



}
