import { Component, OnInit } from '@angular/core';
import { ParentService, Parent } from '../services/parent.service';



@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  /**
   * 
   * @param parentService used to fetch the data from the backend
   */
  constructor(private parentService: ParentService) { }

  
  page: number = 1;// current page
  total: number = 2;// total number of entries
  ascendant: boolean = true;// sort order
  loading: boolean = false;// loading state

  data : Parent[] = [];// data to be displayed in the table


  /**
   * This method is called when the component is initialized,
   * whenever params change, or page is refreshed/reloaded.
   * 
   * It fetches the data of the parent and its children using
   * the page number and sets the data and total number of entries
   */
  ngOnInit(): void {
    this.loading = true;
    this.parentService.getPage(this.page).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.total;
      this.loading = false;
    });
    if (this.data.length == 0) {
      this.loading = false;
    }
  }


  /**
   * 
   * @param page the page number to be fetched
   * 
   * This method is called when the user clicks on a page number
   * in the pagination bar. It fetches the data of the parent and
   * its children using the page number and sets the data and total
   */
  renderPage(page: number): void {
    this.page = page;
    this.loading = true;
    this.parentService.getPage(this.page).subscribe((data: any) => {
      this.data = data.data;
      this.total = data.total;
      this.loading = false;
    });
  }


  /**
   * 
   * @param id the id of the parent whose children are to be displayed
   * 
   * This method is called when the user clicks on a parent in the table.
   * It redirects the user to the child page of the parent.
   */
  gotoChild(id: number): void {
    window.location.href = "/child/" + id;
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
  }


}
