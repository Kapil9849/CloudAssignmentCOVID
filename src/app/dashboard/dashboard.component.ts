import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  States:any={};
  StateLevelCovidData:any[]=[]
  top10Counties:any[]=[]
  basicData:any={};
  basicOptions:any={};
  graph_data:any[]=[]
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 81, 56, 55, 40]
          }
      ]
    };

    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#333333'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#333333'
              },
              grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
              }
          },
          y: {
              ticks: {
                  color: '#333333'
              },
              grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
              }
          }
      }
  };


    this.getCovidData();
    this.getCountryWideData();
  }


  getCovidData()
  {
    this.dashboardService.getStates().subscribe((response)=>{
      this.States=response;
      this.dashboardService.getData().subscribe((response)=>{
        response.forEach((data:any)=>{
          var state:any={};
          state["name"]=this.States[data["state"]];
          state["population"]=data["population"]
          state["total_cases"]=data["actuals"]["cases"]
          state["total_deaths"]=data["actuals"]["deaths"]
          state["new_cases"]=data["actuals"]["newCases"]
          state["new_deaths"]=data["actuals"]["newDeaths"]
          state["hospital_bed_capacity"]=data["actuals"]["hospitalBeds"]["capacity"]
          state["hospital_bed_usage"]=data["actuals"]["hospitalBeds"]["currentUsageTotal"]
          state["icu_bed_capacity"]=data["actuals"]["icuBeds"]["capacity"]
          state["icu_bed_usage"]=data["actuals"]["icuBeds"]["currentUsageTotal"]
          state["vaccinesDistributed"]=data["actuals"]["vaccinesDistributed"]
          state["vaccinationsInitiated"]=data["actuals"]["vaccinationsInitiated"]
          state["vaccinationsCompleted"]=data["actuals"]["vaccinationsCompleted"]
          state["vaccinationsI"]=(state["vaccinationsInitiated"]/state["population"])*100
          state["vaccinationsC"]=(state["vaccinationsCompleted"]/state["population"])*100


          this.StateLevelCovidData.push(state)
        })
      console.log(this.StateLevelCovidData)
      })
    })

  }

  getCountryWideData()
  {
    this.dashboardService.getCountryData().subscribe((response:any)=>{
      console.log(response)
      const sortedData = response.sort((a:any, b:any) => b.actuals.cases - a.actuals.cases);
      this.top10Counties = sortedData.slice(0, 10);
      var lables:any=[]
      var deaths:any=[]
      var total_cases:any=[]
      var vaccinations_initiated:any=[]
      var vaccinations_completed:any=[]
      this.top10Counties.forEach((state:any)=>{
        lables.push(state.county);
        deaths.push(state.actuals.deaths)
        total_cases.push(state.actuals.cases)
        vaccinations_initiated.push(state.actuals.vaccinationsInitiated)
        vaccinations_completed.push(state.actuals.vaccinationsCompleted)
      })
      this.graph_data.push({
        labels: lables,
        datasets: [
            {
                label: 'Total Cases',
                backgroundColor: '#42A5F5',
                data: total_cases
            }
        ]
      });
      this.graph_data.push({
        labels: lables,
        datasets: [
            {
                label: 'Total Deaths',
                backgroundColor: '#42A5F5',
                data: deaths
            }
        ]
      });
      this.graph_data.push({
        labels: lables,
        datasets: [
            {
                label: 'Vccinations Initiated',
                backgroundColor: '#42A5F5',
                data: vaccinations_initiated
            }
        ]
      });
      this.graph_data.push({
        labels: lables,
        datasets: [
            {
                label: 'Vaccinations Completed',
                backgroundColor: '#42A5F5',
                data: vaccinations_completed
            }
        ]
      })
      console.log(this.graph_data)
    })

  }

}
