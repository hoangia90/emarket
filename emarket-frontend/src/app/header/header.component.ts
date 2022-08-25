import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    @Output() sidenavToggled = new EventEmitter<void>();

    constructor(private dataStorageService: DataStorageService) {

    }
    
    toggleSidenav() {
        this.sidenavToggled.emit();
    }

    onSaveData() {
        this.dataStorageService.storeProducts();
    }

    onFetchData() {
        this.dataStorageService.fetchProducts().subscribe();
    }

    getData() {
        this.dataStorageService.getData();
    }
}