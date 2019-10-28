import { Component, OnInit, ViewChild } from "@angular/core";
import { ListService } from "../../service/list.service";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
})
export class ListsComponent implements OnInit {
  name: boolean = true;
  email: boolean = false;
  term: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource;
  displayedColumns = ["id", "name", "email", "phone"];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getUsers().subscribe(users => {
      // Assign the data from API to "this.dataSource"
      this.dataSource = new MatTableDataSource(users.results);
      this.dataSource.paginator = this.paginator;

      // Filtering the data / By default Search bar would filter the "name" of user.
      // But, If you click the email button, It will do the "email" of user.

      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.name.last.toLowerCase().includes(filter.toLowerCase());
      };

      // Sorting the data // I had to do some extra work since I used other properties for name and id of.
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === "name") {
          return item.name.last;
        } else if (property === "id") {
          return item.location.street.number;
        } else {
          return item[property];
        }
      };
    });
  }

  /// Gets called by "keyup" event and Make a new filterd list with input value of search bar.
  applyFilter(filterValue: string) {
    if (!filterValue) this.dataSource.filter = "";
    else {
      this.dataSource.filter = filterValue.toLowerCase();
    }
  }

  // Buttons for decide what to search. Name or Email
  activeEmail() {
    this.email = true;
    this.name = false;
    // Change search mode to email.
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.email.toLowerCase().includes(filter.toLowerCase());
    };
  }

  activeName() {
    this.name = true;
    this.email = false;
    // Change search mode to name.
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.name.last.toLowerCase().includes(filter.toLowerCase());
    };
  }
}
