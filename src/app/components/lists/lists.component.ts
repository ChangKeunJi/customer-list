import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../module/User";
import { ListService } from "../../service/list.service";
import { MatSort, MatSortable, MatTableDataSource } from "@angular/material";
import { DataSource } from "@angular/cdk/table";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
  // pipes: [FilterPipe]
})
export class ListsComponent implements OnInit {
  name: boolean = true;
  email: boolean = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  displayedColumns = ["id", "name", "email", "phone"];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users.results);

      ////! Filtering a name data

      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.name.last.toLowerCase().includes(filter.toLowerCase());
      };

      ////! Sorting a data
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
  applyFilter(filterValue: string) {
    if (!filterValue) this.dataSource.filter = "";
    else {
      this.dataSource.filter = filterValue.toLowerCase();
    }
  }

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
