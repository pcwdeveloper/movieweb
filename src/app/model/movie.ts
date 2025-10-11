export interface Movie {
    id:number;
	name:string;
    languagle:string;
    hour:number;
	minute:number;
	tags:string;
    screens:Screen[];
    createdBy:string;
    createdDate:string;
  }


  export interface Screen{
	id:number;
    screenNo:string;
	movie:Movie;
    createdDate:string;
  }