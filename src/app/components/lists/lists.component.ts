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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource;
  displayedColumns = ["id", "name", "email", "phone"];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getUsers().subscribe(users => {
      // Assign datas from API to this.dataSource
      this.dataSource = new MatTableDataSource(users.results);
      this.dataSource.paginator = this.paginator;

      // Filtering a name data

      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.name.last.toLowerCase().includes(filter.toLowerCase());
      };

      // Sorting a data // I had to do some extra work since I used other properties for name and id.
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

  /// Gets called by keyup event.
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
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.email.toLowerCase().includes(filter.toLowerCase());
    };
  }

  activeName() {
    this.name = true;
    this.email = false;
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.name.last.toLowerCase().includes(filter.toLowerCase());
    };
  }
}
