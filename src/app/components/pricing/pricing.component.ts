import { Component, OnInit, HostListener, ComponentFactoryResolver } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { CartComponent } from '../cart/cart.component';

import pricingSplash from "../../../assets/img/pricing_splash.jpg";




@Component({
  selector: "pricing",
  styleUrls: ["./pricing.component.scss"],
  templateUrl: "./pricing.component.html"
})
export class PricingComponent {

  pricingSplash = pricingSplash;

  windowWidth = window.innerWidth;

  private _activeVersionIndex: number;
  set activeVersionIndex(val: number) {
    this._activeVersionIndex = val;
  }

  get activeVersionIndex() {
    return this._activeVersionIndex;
  }

  mediumScreenWidth = 830;
  largescreenWidth = 1100;
  extraLargeScreenWidth = 1400;

  productVersionNames: Array<string>;
  productPurchaseLinks: Array<string>;
  featureSections: Array<Object>;


  constructor(
    private resolver: ComponentFactoryResolver,
    private modal: ModalService,) {

  }

  ngOnInit() {
    this.adjustViewableFeatures();
    this.initFeatureSections();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.adjustViewableFeatures();
  }

  adjustViewableFeatures() {
    if (this.windowWidth < this.mediumScreenWidth) {
      this.activeVersionIndex = 0;
    } else {
      this.activeVersionIndex = -1;
    }
  }

  showFeatureVersion(i) {
    this.activeVersionIndex = i;
  }

  isActiveVersion(i) {
    return i == this.activeVersionIndex;
  }

  initFeatureSections() {
    this.productVersionNames = [];
    this.productPurchaseLinks = [];
    this.featureSections = [];

    for (let i = 0; i < this.productData.length; i++) {
      let product = this.productData[i];

      this.addVersionData(product);
    }
  }

  addVersionData(productData) {
    this.productVersionNames.push(productData.productName);
    this.productPurchaseLinks.push(productData.purchaseLink);

    for (let i = 0; i < productData.featureSections.length; i++) {
      let featureSectionData = productData.featureSections[i];

      if (this.featureSections.length < i + 1) {
        let newFeatureSection = {};
        if (featureSectionData.mainHeader) {
          newFeatureSection["mainHeader"] = featureSectionData.mainHeader
        }
        if (featureSectionData.secondaryHeader) {
          newFeatureSection["secondaryHeader"] = featureSectionData.secondaryHeader
        }
        this.featureSections.push(newFeatureSection);
      }

      let featureSection = this.featureSections[i];
      for (let j = 0; j < featureSectionData.features.length; j++) {
        let featureData = featureSectionData.features[j];

        if (!featureSection["features"]) {
          featureSection["features"] = [];
        }

        if (featureSection["features"].length < j + 1) {
          let newFeature = {};
          newFeature["name"] = featureData["featureName"];
          newFeature["versionValues"] = [];
          if(featureData.annotation) {
            newFeature["annotation"] = featureData["annotation"];
          }
          featureSection["features"].push(newFeature);
        }

        let feature = featureSection["features"][j];
        feature["versionValues"].push(featureData["value"])
      }
    }
  }


  openModal(purchaseLink: string): void {
    console.log("using purchase link", purchaseLink);
    let componentFactory = this.resolver.resolveComponentFactory(CartComponent);
    let modal = this.modal.createFromFactory(componentFactory, {
      purchaseLink: purchaseLink,
      ok: (result) => {
          //this.router.navigate['/']
      }
    });
  }

  productData = [{
    "productName": "CE",
    "purchaseLink": "https://www.e-junkie.com/ecom/gb.php?c=cart&ejc=2&cl=316247&i=SMRP5",
    "featureSections": [
      {
        "mainHeader": "Pricing",
        "features": [{
            "featureName": "SMART V3 (includes unlimited software updates and all new features)",
            "value": "$1000" 
          },
          {
            "featureName": "Users",
            "value": 5
          },
          {
            "featureName": "Online Demonstration (1 hour)",
            "value": "$50"
          },
          {
            "featureName": "SMART Community Interactive Support Center (coming in 2018)",
            "value": "$240/year"
          },
          {
            "featureName": "Email/Phone Support (30 min. minimum)",
            "value": "$125/hour"
          },
          {
            "featureName": "Programming Consultation",
            "value": "$200/hour"
          },
          {
            "featureName": "On-site Consultation-Training Level",
            "value": "n/a"
          },
          {
            "featureName": "Feasibility and System Architecture Study",
            "value": "n/a"
          },
          {
            "featureName": "Plugin Customized Applications (on approval)",
            "value": "n/a"
          },
          {
            "featureName": "Muskoka Plant Tour Demonstration of SMART features and capabilities (3 hours)",
            "value": "$500"
          }
        ]
      },{
        "mainHeader": "Project Management",
        "secondaryHeader": "Project Entry and Control",
        "features": [{
            "featureName": "Project Editor",
            "value": [
              true,
              "Basic project properties"
            ]
            },
          {
            "featureName": "Bid Control",
            "value": false          },
          {
            "featureName": "Estimating Control",
            "value": true          },
          {
            "featureName": "Engineering Control",
            "value": true,
            "annotation": "Allows for the creation of Work Orders and the ability to transfer materials to purchasing."
          },
          {
            "featureName": "Non-Conformance Record Creation",
            "value": false
          },
          {
            "featureName": "Parts Editor",
            "value": false
          },
          {
            "featureName": "CW Data Import",
            "value": true
          },
          {
            "featureName": "CV Data Import",
            "value": true
          },
          {
            "featureName": "Take-Off Data Import",
            "value": true
          },
          {
            "featureName": "20/20 Data Import",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Project Tracking",
        "features": [{
            "featureName": "Project Cost Summary",
            "value": false
          },
          {
            "featureName": "Production Progress",
            "value": false
          },
          {
            "featureName": "Project Notifications",
            "value": false
          },
          {
            "featureName": "Overhead Labor Allocations",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Materials Management",
        "secondaryHeader": "Purchasing",
        "features": [{
            "featureName": "Purchase Orders",
            "value": true
          },
          {
            "featureName": "Material Allocations",
            "value": false
          },
          {
            "featureName": "Material Receiving",
            "value": false
          },
          {
            "featureName": "Material Checkout",
            "value": false
          },
          {
            "featureName": "Quickbooks Link",
            "value": false
          },
          {
            "featureName": "Auto Allocation",
            "value": false
          },
          {
            "featureName": "Under Min Tracking",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "Material Management",
        "features": [{
            "featureName": "Material Inventory",
            "value": false
          },
          {
            "featureName": "List Material Setup",
            "value": true
          },
          {
            "featureName": "Wizard Material Setup",
            "value": true
          },
          {
            "featureName": "Material Setup",
            "value": "Limited"
          },
          {
            "featureName": "Material Documents",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Production Management",
        "secondaryHeader": "Scheduling",
        "features": [{
            "featureName": "Production Scheduling",
            "value": "Limited"
          },
          {
            "featureName": "Production Scheduling List",
            "value": false
          },
          {
            "featureName": "Production Capacity Tools",
            "value": false
          },
          {
            "featureName": "Installation Scheduling",
            "value": "Limited"
          },
          {
            "featureName": "Installation Scheduling List",
            "value": false
          },
          {
            "featureName": "Installation Capacity Tools",
            "value": false
          },
          {
            "featureName": "Production Station Breakout",
            "value": false
          },
          {
            "featureName": "Task Reminders",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "Production Tracking",
        "features": [{
          "featureName": "Factory Floor Monitor",
          "value": false,
          "annotation": "Powerful real time tool to show the current status of all active work orders and employees at all active Production Stations."
        }]
      },
      {
        "secondaryHeader": "Production Utility",
        "features": [{
            "featureName": "Factory Floor Layout",
            "value": false
          },
          {
            "featureName": "Work Order Management",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "Production Station",
        "features": [{
            "featureName": "Labour Setup Basic",
            "value": true
          },
          {
            "featureName": "Production Station",
            "value": false
          },
          {
            "featureName": "Time Clock",
            "value": false
          },
          {
            "featureName": "Production Station Setup",
            "value": false
          },
          {
            "featureName": "Production Startup Wizard",
            "value": false
          },
          {
            "featureName": "Station Messaging",
            "value": false
          },
          {
            "featureName": "Machine Maintenance",
            "value": false
          },
          {
            "featureName": "Bar Code Scan Processing",
            "value": false
          },
          {
            "featureName": "RFID Scan Processing",
            "value": false
          },
          {
            "featureName": "Web Input Scan Processing",
            
          }
        ]
      },
      {
        "secondaryHeader": "Production Automation",
        "features": [{
            "featureName": "Local Data Capture",
            "value": false,
            "annotation": "Enables RFID Tag reading and status assignment."
          },
          {
            "featureName": "RFID Part Writer",
            "value": false
          },
          {
            "featureName": "SMART Cart Assignment",
            "value": false,
            "annotation": "SMART Carts are an automated part storage and transportation system. They work with the Automated SMART AGV and position location system."
          }
        ]
      },
      {
        "mainHeader": "Contact Management",
        "secondaryHeader": "Contact Management",
        "features": [{
            "featureName": "Clients List",
            "value": true
          },
          {
            "featureName": "Clients Management",
            "value": true
          },
          {
            "featureName": "Clients Documents",
            "value": true
          },
          {
            "featureName": "Vendor List",
            "value": true
          },
          {
            "featureName": "Vendor Management",
            "value": true
          },
          {
            "featureName": "Employee List",
            "value": true
          },
          {
            "featureName": "Employee Management",
            "value": true
          },
          {
            "featureName": "Employee Documents",
            "value": true
          },
          {
            "featureName": "Employee Time Management",
            "value": false
          },
          {
            "featureName": "Employee Safety/Training",
            "value": false
         },
          {
            "featureName": "Other Company Relationships",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Factory Management",
        "secondaryHeader": "Factory",
        "features": [{
            "featureName": "Factory Setup",
            "value": "Limited"
          },
          {
            "featureName": "SMART User Setup",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "System Settings",
        "features": [{
          "featureName": "System Settings",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Global Management",
        "features": [{
          "featureName": "Factory Management Dashboard",
          "value": false
        },
        {
          "featureName": "Planning Calendar",
          "value": true
        }
      ]
      },
      {
        "mainHeader": "Report Management",
        "secondaryHeader": "Reporting",
        "features": [{
            "featureName": "Company Reports",
            "value": true
          },
          {
            "featureName": "Report Standalone",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Report Creation",
        "features": [{
          "featureName": "Report Designer",
          "value": false
        }]
      },
      {
        "secondaryHeader": "Advanced Reporting",
        "features": [{
          "featureName": "Custom Label Designer",
          "value": false
        }]
      },
      {
        "mainHeader": "Library Management",
        "secondaryHeader": "Library Management",
        "features": [{
            "featureName": "Library Management Main",
            "value": false,
            "annotation": "Allows for the creation of Smart Libraries. A SMART library is a collection of products, product options, door styles, and in some cases parts. All of these items have detailed properties to allow them to be used for pricing, production, and reporting."
          },
          {
            "featureName": "Library Parts Creation",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Utility",
        "secondaryHeader": "Data Handling",
        "features": [{
            "featureName": "Import Export",
            "value": true,
            "annotation": "Functions to import data from multiple file types and applications and functions to export data for backup, transfer or external editing. "
          },
          {
            "featureName": "Data Interface",
            "value": false,
            "annotation": "Data Interface provides direct access to all of the data in the primary database. Any table can be loaded and edited."
          },
          {
            "featureName": "Backup Utility",
            "value": true
          },
          {
            "featureName": "Refresh System Data",
            "value": true
          },
          {
            "featureName": "SQL to Access Backup",
            "value": false
          },
          {
            "featureName": "System Data Capture",
            "value": false,
            "annotation": "Performs data transfer and other automated system functions."
          },
          {
            "featureName": "Planit Data Capture Utility",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "Technician Setup Advanced",
        "features": [{
            "featureName": "Import Map Editor",
            "value": true
          },
          {
            "featureName": "Import Part Modify Rules",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Extended",
        "secondaryHeader": "Plugins",
        "features": [{
          "featureName": "Plugin Capability",
          "value": false,
            "annotation": "Plug-ins are user created applications that can take advantage or SMART data structures and functions and can be accessed within the SMART application."
        }]
      },
      {
        "mainHeader": "Web and Mobile Apps",
        "features": [{
            "featureName": "Site Report Creation",
            "value": false,
            "annotation": "Site reports are Non-Conformance or situation reports entered on site by installers or service personnel.The entered reports are handled by the SMART Web Server with the assistance of System Data Capture on the local server."
          },
          {
            "featureName": "Mobile App Tools requires SQL server",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "System Requirements",
        "features": [{
            "featureName": "OS",
            "value": "Windows 7 or above"
          },
          {
            "featureName": "RAM",
            "value": "4 GB"
          },
          {
            "featureName": "Server",
            "value": "Peer to Peer"
          },
          {
            "featureName": "Screen Resolution",
            "value": "900x1440"
          },
          {
            "featureName": "Network",
            "value": "n/a"
          },
          {
            "featureName": "CPU",
            "value": "i5 eq. or above"
          }
        ]
      },
      {
        "mainHeader": "Options",
        "features": [{
            "featureName": "SMART CV Connect-converts 20/20 XML file to CV ORD file Single user",
            "value": "$500"
          },
          {
            "featureName": "Software Buyout (available after 1st year, annual software maintenance plan extra)",
            "value": "n/a"
          }
        ]
      }
    ]
  },
  {
    "productName": "Standard",
    "purchaseLink": "https://www.e-junkie.com/ecom/gb.php?c=cart&ejc=2&cl=316247&i=SMRP10",
    "featureSections": [
      {
        "mainHeader": "Pricing",
        "features": [{
            "featureName": "SMART V3 (includes unlimited software updates and all new features)",
            "value": "$150/month"
          },
          {
            "featureName": "Users",
            "value": 15
          },
          {
            "featureName": "Online Demonstration (1 hour)",
            "value": "$50"
          },
          {
            "featureName": "SMART Community Interactive Support Center (coming in 2018)",
            "value": "$240/year"
          },
          {
            "featureName": "Email/Phone Support (30 min. minimum)",
            "value": "$125/hour"
          },
          {
            "featureName": "Programming Consultation",
            "value": "$200/hour"
          },
          {
            "featureName": "On-site Consultation-Training Level",
            "value": "$1500/day+travel"
          },
          {
            "featureName": "Feasibility and System Architecture Study",
            "value": "$160/hour"
          },
          {
            "featureName": "Plugin Customized Applications (on approval)",
            "value": "n/a"
          },
          {
            "featureName": "Muskoka Plant Tour Demonstration of SMART features and capabilities (3 hours)",
            "value": "$500"
          }
        ]
      },{
        "mainHeader": "Project Management",
        "secondaryHeader": "Project Entry and Control",
        "features": [{
            "featureName": "Project Editor",
            "value": true
          },
          {
            "featureName": "Bid Control",
            "value": true
          },
          {
            "featureName": "Estimating Control",
            "value": true
          },
          {
            "featureName": "Engineering Control",
            "value": true
          },
          {
            "featureName": "Non-Conformance Record Creation",
            "value": true
          },
          {
            "featureName": "Parts Editor",
            "value": true
          },
          {
            "featureName": "CW Data Editor",
            "value": true
          },
          {
            "featureName": "CV Data Editor",
            "value": true
          },
          {
            "featureName": "Take-Off Data Import",
            "value": true
          },
          {
            "featureName": "20/20 Data Import",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Project Tracking",
        "features": [{
            "featureName": "Project Cost Summary",
            "value": true
          },
          {
            "featureName": "Production Progress",
            "value": true
          },
          {
            "featureName": "Project Notifications",
            "value": false
          },
          {
            "featureName": "Overhead Labor Allocations",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Materials Management",
        "secondaryHeader": "Purchasing",
        "features": [{
            "featureName": "Purchase Orders",
            "value": true
          },
          {
            "featureName": "Material Allocations",
            "value": true
          },
          {
            "featureName": "Material Receiving",
            "value": true
          },
          {
            "featureName": "Material Checkout",
            "value": true
          },
          {
            "featureName": "Quickbooks Link",
            "value": true
          },
          {
            "featureName": "Auto Allocation",
            "value": false
          },
          {
            "featureName": "Under Min Tracking",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Material Management",
        "features": [{
            "featureName": "Material Inventory",
            "value": true
          },
          {
            "featureName": "List Material Setup",
            "value": true
          },
          {
            "featureName": "Wizard Material Setup",
            "value": true
          },
          {
            "featureName": "Material Setup",
            "value": "Full"
          },
          {
            "featureName": "Material Documents",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Production Management",
        "secondaryHeader": "Scheduling",
        "features": [{
            "featureName": "Production Scheduling",
            "value": true
          },
          {
            "featureName": "Production Scheduling List",
            "value": true
          },
          {
            "featureName": "Production Capacity Tools",
            "value": true
          },
          {
            "featureName": "Installation Scheduling",
            "value": true
          },
          {
            "featureName": "Installation Scheduling List",
            "value": true
          },
          {
            "featureName": "Installation Capacity Tools",
            "value": true
          },
          {
            "featureName": "Production Station Breakout",
            "value": true
          },
          {
            "featureName": "Task Reminders",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Production Tracking",
        "features": [{
          "featureName": "Factory Floor Monitor",
          "value": false
        }]
      },
      {
        "secondaryHeader": "Production Utility",
        "features": [{
            "featureName": "Factory Floor Layout",
            "value": true
          },
          {
            "featureName": "Work Order Management",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Production Station",
        "features": [{
            "featureName": "Labour Setup Basic",
            "value": true
          },
          {
            "featureName": "Production Station",
            "value": true
          },
          {
            "featureName": "Time Clock",
            "value": true
          },
          {
            "featureName": "Production Station Setup",
            "value": true
          },
          {
            "featureName": "Production Startup Wizard",
            "value": true
          },
          {
            "featureName": "Station Messaging",
            "value": true
          },
          {
            "featureName": "Machine Maintenance",
            "value": false
          },
          {
            "featureName": "Bar Code Scan Processing",
            "value": true
          },
          {
            "featureName": "RFID Scan Processing",
            "value": false
          },
          {
            "featureName": "Web Input Scan Processing",
            "value": false
          }
        ]
      },
      {
        "secondaryHeader": "Production Automation",
        "features": [{
            "featureName": "Local Data Capture",
            "value": false
          },
          {
            "featureName": "RFID Part Writer",
            "value": false
          },
          {
            "featureName": "SMART Cart Assignment",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Contact Management",
        "secondaryHeader": "Contact Management",
        "features": [{
            "featureName": "Clients List",
            "value": true
          },
          {
            "featureName": "Clients Management",
            "value": true
          },
          {
            "featureName": "Clients Documents",
            "value": true
          },
          {
            "featureName": "Vendors List",
            "value": true
          },
          {
            "featureName": "Vendors Management",
            "value": true
          },
          {
            "featureName": "Employees List",
            "value": true
          },
          {
            "featureName": "Employees Management",
            "value": true
          },
          {
            "featureName": "Employees Documents",
            "value": true
          },
          {
            "featureName": "Employee Time Management",
            "value": true
          },
          {
            "featureName": "Employee Safety/Training",
            "value": true
          },
          {
            "featureName": "Other Company Relationships",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Factory Management",
        "secondaryHeader": "Factory",
        "features": [{
            "featureName": "Factory Setup",
            "value": true
          },
          {
            "featureName": "SMART User Setup",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "System Settings",
        "features": [{
          "featureName": "System Settings",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Global Management",
        "features": [{
            "featureName": "Factory Management Dashboard",
            "value": false
          },
          {
            "featureName": "Planning Calendar",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Report Management",
        "secondaryHeader": "Reporting",
        "features": [{
            "featureName": "Company Reports",
            "value": true
          },
          {
            "featureName": "Report Standalone",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Report Creation",
        "features": [{
          "featureName": "Report Designer",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Advanced Reporting",
        "features": [{
          "featureName": "Custom Label Designer",
          "value": false
        }]
      },
      {
        "mainHeader": "Library Management",
        "secondaryHeader": "Library Management",
        "features": [{
            "featureName": "Library Management Main",
            "value": true
          },
          {
            "featureName": "Library Parts Creation",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "Utility",
        "secondaryHeader": "Data Handling",
        "features": [{
            "featureName": "Import Export",
            "value": true
          },
          {
            "featureName": "Data Interface",
            "value": false
          },
          {
            "featureName": "Backup Utility",
            "value": true
          },
          {
            "featureName": "Refresh System Data",
            "value": true
          },
          {
            "featureName": "SQL to Access Backup",
            "value": true
          },
          {
            "featureName": "System Data Capture",
            "value": false
          },
          {
            "featureName": "Planit Data Capture Utility",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Technician Setup Advanced",
        "features": [{
            "featureName": "Import Map Editor",
            "value": true
          },
          {
            "featureName": "Import Part Modify Rules",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Extended",
        "secondaryHeader": "Plugins",
        "features": [{
          "featureName": "Plugin Capability",
          "value": false
        }]
      },
      {
        "mainHeader": "Web and Mobile Apps",
        "features": [{
            "featureName": "Site Report Creation",
            "value": false
          },
          {
            "featureName": "Mobile App Tools requires SQL server",
            "value": false
          }
        ]
      },
      {
        "mainHeader": "System Requirements",
        "features": [{
            "featureName": "OS",
            "value": "Windows 7 or above"
          },
          {
            "featureName": "RAM",
            "value": "8 GB"
          },
          {
            "featureName": "Server",
            "value": "Client Server Set-up"
          },
          {
            "featureName": "Screen Resolution",
            "value": "900x1440"
          },
          {
            "featureName": "Network",
            "value": "Wired"
          },
          {
            "featureName": "CPU",
            "value": "i5 eq. or above"
          }
        ]
      },
      {
        "mainHeader": "Options",
        "features": [{
            "featureName": "SMART CV Connect-converts 20/20 XML file to CV ORD file Single user",
            "value": ""
          },
          {
            "featureName": "Software Buyout (available after 1st year, annual software maintenance plan extra)",
            "value": "$9000"
          }
        ]
      }
    ]
  },
  {
    "productName": "Ultimate",
    "purchaseLink": "https://www.e-junkie.com/ecom/gb.php?c=cart&ejc=2&cl=316247&i=SMRP15",
    "featureSections": [
      {
        "mainHeader": "Pricing",
        "features": [{
            "featureName": "SMART V3 (includes unlimited software updates and all new features)",
            "value": "$300/month"
          },
          {
            "featureName": "Users",
            "value": 30
          },
          {
            "featureName": "Online Demonstration (1 hour)",
            "value": "$50"
          },
          {
            "featureName": "SMART Community Interactive Support Center (coming in 2018)",
            "value": "$240/year"
          },
          {
            "featureName": "Email/Phone Support (30 min. minimum)",
            "value": "$125/hour"
          },
          {
            "featureName": "Programming Consultation",
            "value": "$200/hour"
          },
          {
            "featureName": "On-site Consultation-Training Level",
            "value": "$1500/day+travel"
          },
          {
            "featureName": "Feasibility and System Architecture Study",
            "value": "$160/hour"
          },
          {
            "featureName": "Plugin Customized Applications (on approval)",
            "value": "$5000 min. up to 25 hours. +  $200/hour"
          },
          {
            "featureName": "Muskoka Plant Tour Demonstration of SMART features and capabilities (3 hours)",
            "value": "$500"
          }
        ]
      },{
        "mainHeader": "Project Management",
        "secondaryHeader": "Project Entry and Control",
        "features": [{
            "featureName": "Project Editor",
            "value": true
          },
          {
            "featureName": "Bid Control",
            "value": true
          },
          {
            "featureName": "Estimating Control",
            "value": true
          },
          {
            "featureName": "Engineering Control",
            "value": true
          },
          {
            "featureName": "Non-Conformance Record Creation",
            "value": true
          },
          {
            "featureName": "Parts Editor",
            "value": true
          },
          {
            "featureName": "CW Data Editor",
            "value": true
          },
          {
            "featureName": "CV Data Editor",
            "value": true
          },
          {
            "featureName": "Take-Off Data Import",
            "value": true
          },
          {
            "featureName": "20/20 Data Import",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Project Tracking",
        "features": [{
            "featureName": "Project Cost Summary",
            "value": true
          },
          {
            "featureName": "Production Progress",
            "value": true
          },
          {
            "featureName": "Project Notifications",
            "value": true
          },
          {
            "featureName": "Overhead Labor Allocations",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Materials Management",
        "secondaryHeader": "Purchasing",
        "features": [{
            "featureName": "Purchase Orders",
            "value": true
          },
          {
            "featureName": "Material Allocations",
            "value": true
          },
          {
            "featureName": "Material Receiving",
            "value": true
          },
          {
            "featureName": "Material Checkout",
            "value": true
          },
          {
            "featureName": "Quickbooks Link",
            "value": true
          },
          {
            "featureName": "Auto Allocation",
            "value": true
          },
          {
            "featureName": "Under Min Tracking",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Material Management",
        "features": [{
            "featureName": "Material Inventory",
            "value": true
          },
          {
            "featureName": "List Material Setup",
            "value": true
          },
          {
            "featureName": "Wizard Material Setup",
            "value": true
          },
          {
            "featureName": "Material Setup",
            "value": "Full"
          },
          {
            "featureName": "Material Documents",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Production Management",
        "secondaryHeader": "Scheduling",
        "features": [{
            "featureName": "Production Scheduling",
            "value": true
          },
          {
            "featureName": "Production Scheduling List",
            "value": true
          },
          {
            "featureName": "Production Capacity Tools",
            "value": true
          },
          {
            "featureName": "Installation Scheduling",
            "value": true
          },
          {
            "featureName": "Installation Scheduling List",
            "value": true
          },
          {
            "featureName": "Installation Capacity Tools",
            "value": true
          },
          {
            "featureName": "Production Station Breakout",
            "value": true
          },
          {
            "featureName": "Task Reminders",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Production Tracking",
        "features": [{
          "featureName": "Factory Floor Monitor",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Production Utility",
        "features": [{
            "featureName": "Factory Floor Layout",
            "value": true
          },
          {
            "featureName": "Work Order Management",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Production Station",
        "features": [{
            "featureName": "Labour Setup Basic",
            "value": true
          },
          {
            "featureName": "Production Station",
            "value": true
          },
          {
            "featureName": "Time Clock",
            "value": true
          },
          {
            "featureName": "Production Station Setup",
            "value": true
          },
          {
            "featureName": "Production Startup Wizard",
            "value": true
          },
          {
            "featureName": "Station Messaging",
            "value": true
          },
          {
            "featureName": "Machine Maintenance",
            "value": true
          },
          {
            "featureName": "Bar Code Scan Processing",
            "value": true
          },
          {
            "featureName": "RFID Scan Processing",
            "value": true
          },
          {
            "featureName": "Web Input Scan Processing",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Production Automation",
        "features": [{
            "featureName": "Local Data Capture",
            "value": true
          },
          {
            "featureName": "RFID Part Writer",
            "value": true
          },
          {
            "featureName": "SMART Cart Assignment",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Contact Management",
        "secondaryHeader": "Contact Management",
        "features": [{
            "featureName": "Clients List",
            "value": true
          },
          {
            "featureName": "Clients Management",
            "value": true
          },
          {
            "featureName": "Clients Documents",
            "value": true
          },
          {
            "featureName": "Vendors List",
            "value": true
          },
          {
            "featureName": "Vendors Management",
            "value": true
          },
          {
            "featureName": "Employees List",
            "value": true
          },
          {
            "featureName": "Employees Management",
            "value": true
          },
          {
            "featureName": "Employees Documents",
            "value": true
          },
          {
            "featureName": "Employee Time Management",
            "value": true
          },
          {
            "featureName": "Employee Safety/Training",
            "value": true
          },
          {
            "featureName": "Other Company Relationships",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Factory Management",
        "secondaryHeader": "Factory",
        "features": [{
            "featureName": "Factory Setup",
            "value": true
          },
          {
            "featureName": "SMART User Setup",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "System Settings",
        "features": [{
          "featureName": "System Settings",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Global Management",
        "features": [{
            "featureName": "Factory Management Dashboard",
            "value": true
          },
          {
            "featureName": "Planning Calendar",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Report Management",
        "secondaryHeader": "Reporting",
        "features": [{
            "featureName": "Company Reports",
            "value": true
          },
          {
            "featureName": "Report Standalone",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Report Creation",
        "features": [{
          "featureName": "Report Designer",
          "value": true
        }]
      },
      {
        "secondaryHeader": "Advanced Reporting",
        "features": [{
          "featureName": "Custom Label Designer",
          "value": true
        }]
      },
      {
        "mainHeader": "Library Management",
        "secondaryHeader": "Library Management",
        "features": [{
            "featureName": "Library Management Main",
            "value": true
          },
          {
            "featureName": "Library Parts Creation",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Utility",
        "secondaryHeader": "Data Handling",
        "features": [{
            "featureName": "Import Export",
            "value": true
          },
          {
            "featureName": "Data Interface",
            "value": true
          },
          {
            "featureName": "Backup Utility",
            "value": true
          },
          {
            "featureName": "Refresh System Data",
            "value": true
          },
          {
            "featureName": "SQL to Access Backup",
            "value": true
          },
          {
            "featureName": "System Data Capture",
            "value": true
          },
          {
            "featureName": "Planit Data Capture Utility",
            "value": true
          }
        ]
      },
      {
        "secondaryHeader": "Technician Setup Advanced",
        "features": [{
            "featureName": "Import Map Editor",
            "value": true
          },
          {
            "featureName": "Import Part Modify Rules",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "Extended",
        "secondaryHeader": "Plugins",
        "features": [{
          "featureName": "Plugin Capability",
          "value": true
        }]
      },
      {
        "mainHeader": "Web and Mobile Apps",
        "features": [{
            "featureName": "Site Report Creation",
            "value": true
          },
          {
            "featureName": "Mobile App Tools requires SQL server",
            "value": true
          }
        ]
      },
      {
        "mainHeader": "System Requirements",
        "features": [{
            "featureName": "OS",
            "value": "Windows 7 or above"
          },
          {
            "featureName": "RAM",
            "value": "8 GB"
          },
          {
            "featureName": "Server",
            "value": "Client Server Set-up"
          },
          {
            "featureName": "Screen Resolution",
            "value": "900x1440"
          },
          {
            "featureName": "Network",
            "value": "Wired"
          },
          {
            "featureName": "CPU",
            "value": "i5 eq. or above"
          }
        ]
      },
      {
        "mainHeader": "Options",
        "features": [{
            "featureName": "SMART CV Connect-converts 20/20 XML file to CV ORD file Single user",
            "value": ""
          },
          {
            "featureName": "Software Buyout (available after 1st year, annual software maintenance plan extra)",
            "value": "$18000"
          }
        ]
      }
    ]
  }
]
}