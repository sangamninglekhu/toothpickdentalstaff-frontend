import { Component, OnInit } from "@angular/core";
import { Career } from "src/app/_models/career";
import { CareerService } from "src/app/_services";

@Component({
  selector: "app-career",
  templateUrl: "./career.component.html",
  styleUrls: ["./career.component.css"],
})
export class CareerComponent implements OnInit {
  private jobList: Career[];
  constructor(private careerService: CareerService) {}

  ngOnInit() {
    this.careerService.getJobs().subscribe(
      (data) => {
        this.jobList = data;
        console.log("jobs: ", data);
      }
    );
  }
}
