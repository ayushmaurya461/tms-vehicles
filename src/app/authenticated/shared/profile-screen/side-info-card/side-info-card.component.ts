import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-info-card',
  templateUrl: './side-info-card.component.html',
  styleUrls: ['./side-info-card.component.css']
})
export class SideInfoCardComponent implements OnInit {

  public sideInfoData:any = [
    {
      id: 'trips',
      title: "Trips",
      icon: "",
      iconImage: "assets/img/icon/trip.png",
      data: [
        {
          id: '1100',
          title: "Sanand Railway Station - Pegasus Ahmadabad",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Sanand Railway Station"},
            { title: "To", data: "Pegasus Ahmadabad"},
            { title: "Freight", data: "6,240.00"},
            { title: "Expense", data: "2,929.12"},
            { title: "P&L", data: "2,765.88"},
          ]
        },
        {
          id: '1101',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1102',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1103',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1104',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1105',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1106',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        },
        {
          id: '1107',
          title: "Pegasus Ahmadabad - Sanand Railway Station",
          data: [
            { title: "Settlement No", data: "SN2122FTS3333"},
            { title: "From", data: "Pegasus Ahmadabad"},
            { title: "To", data: "Sanand Railway Station"},
            { title: "Freight", data: "0.00"},
            { title: "Expense", data: "929.12"},
            { title: "P&L", data: "-929.12"},
          ]
        }
      ]
    },
    {
      id: 'tyres',
      title: "Tyres",
      icon: "",
      iconImage: "assets/img/icon/tyre.png",
      data: [
        {
          id: '1200',
          title: "U1774033820 - Apollo",
          data: [
            { title: "Vehicle No", data: "HR55R6334"},
            { title: "Date", data: "22-02-2022"},
            { title: "Tyre Run", data: "232KM"},
            { title: "CPKM", data: "22KM"},
            { title: "Reson", data: "Unknown"},
          ]
        },
        {
          id: '1201',
          title: "70091721916 - MRF",
          data: [
            { title: "Vehicle No", data: "RJ55R6334"},
            { title: "Date", data: "21-02-2022"},
            { title: "Tyre Run", data: "232KM"},
            { title: "CPKM", data: "22KM"},
            { title: "Reson", data: "Unknown"},
          ]
        }
      ]
    },
    {
      id: 'maintainance',
      title: "Maintainance",
      icon: "",
      iconImage: "assets/img/icon/maintainance.png",
      data: [
        {
          id: '1300',
          title: "HR55R6334",
          data: [
            { title: "JCNo", data: "DSWE2324234"},
            { title: "Date", data: "22-02-2022"},
            { title: "Maintainance Type", data: "Repair"},
            { title: "Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        },
        {
          id: '1301',
          title: "RJ55R2514",
          data: [
            { title: "JCNo", data: "DSWE2324234"},
            { title: "Date", data: "22-02-2022"},
            { title: "Maintainance Type", data: "Repair"},
            { title: "Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        }
      ]
    },
    {
      id: 'accidents',
      title: "Accidents",
      icon: "",
      iconImage: "assets/img/icon/accident.png",
      data: [
        {
          id: '1400',
          title: "HR55R6334",
          data: [
            { title: "Route", data: "Sanand Railway Station - Pegasus Ahmadabad"},
            { title: "Status", data: "Load"},
            { title: "Loss/Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        },
        {
          id: '1401',
          title: "RJ55R2514",
          data: [
            { title: "Route", data: "Pegasus Ahmadabad - Sanand Railway Station"},
            { title: "Status", data: "Empty"},
            { title: "Loss/Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        }
      ]
    },
    {
      id: 'challans',
      title: "Challans",
      icon: "",
      iconImage: "assets/img/icon/challan.png",
      data: [
        {
          id: '1500',
          title: "HR55R6334",
          data: [
            { title: "Route", data: "Sanand Railway Station - Pegasus Ahmadabad"},
            { title: "Status", data: "Load"},
            { title: "Loss/Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        },
        {
          id: '1501',
          title: "RJ55R2514",
          data: [
            { title: "Route", data: "Pegasus Ahmadabad - Sanand Railway Station"},
            { title: "Status", data: "Empty"},
            { title: "Loss/Cost", data: "2200"},
            { title: "Reson", data: "Unknown"},
          ]
        }
      ]
    },
    {
      id: 'vehicleHistory',
      title: "Vehicle History",
      icon: "",
      iconImage: "assets/img/icon/truck.png",
      data: [
        {
          id: '1600',
          title: "HR55R6334",
          data: [
            { title: "Body Type", data: "TR8"},
            { title: "From Date", data: "21/01/2022"},
            { title: "To Date", data: "24/02/2022"},
            { title: "Time", data: "1 month, 3 days"},
            { title: "Status", data: "Not Active"},
            { title: "Releaving Reason", data: "Unknown"},
          ]
        },
        {
          id: '1701',
          title: "RJ55R2514",
          data: [
            { title: "Body Type", data: "TR8"},
            { title: "From Date", data: "21/01/2022"},
            { title: "To Date", data: "24/02/2022"},
            { title: "Time", data: "1 month, 3 days"},
            { title: "Status", data: "Not Active"},
            { title: "Releaving Reason", data: "Unknown"},
          ]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    $("#profile").addClass('active');
  }

  showDetails(action:string){
    $(".side-card").removeClass('active');
    $("#"+action).addClass('active');
  }

}
