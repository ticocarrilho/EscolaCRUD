import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { ActionEmitted } from 'src/app/core/models/actionEmitted.type';
import { TableColumns } from 'src/app/core/models/tableColumns.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedAction: EventEmitter<ActionEmitted> = new EventEmitter<ActionEmitted>();
  @Input() tableName!: string;
  @Input() dataSource!: any[];
  @Input() tableColumns!: TableColumns;
  @Input() openAddHandler!: Function;
  @Input() currentPage!: BehaviorSubject<number>;
  @Input() totalCount!: number;
  @Input() set actions (actions: string[]) {
    this.tableColumns.columnsName.push('actions');
    this.tableColumns.columnsText.push('Ações');
    this.tableActions = actions;
  }

  searchForm: FormGroup;
  tableActions!: string[];

  constructor(private fb: FormBuilder) { 
    this.searchForm = this.fb.group({
      search: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmitHandler() {
    this.search.emit(this.searchForm.get('search')?.value);
  }

  onActionClickHandler(element: any, action: string) {
    const { id, ...object } = element;
    this.selectedAction.emit({
      id,
      action,
      info: object,
    });
  }

  setPage(event: PageEvent) {
    this.currentPage.next(event.pageIndex)
  }
}
