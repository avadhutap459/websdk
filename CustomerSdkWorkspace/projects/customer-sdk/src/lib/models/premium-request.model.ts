export interface PremiumRequest {
  InwardDate: string;
  ApplicationNo: string;
  Source: string;
  CustomerID: string;

  AddField: {
    Dummy: {
      DummyName: string;
      DummyValue: string;
    }[];
  };

  ApplicantDetails: {
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    Gender: string;
    Email: string;
    ContactNumber: string;
    City: string;
    State: string;
  };

  ProposerDetails: {
    IsProposersameasApplicant: boolean;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    Gender: string;
    Email: string;
    ContactNumber: string;
    City: string;
    State: string;
  };

  ProductInfo: Record<string, string>;

  IsRiderOpt: boolean;

  Riders: {
    ridername: string;
    ridervalue: string;
  }[];

  FundStrategy: string;

  Funds: {
    fundname: string;
    fundvalue: string;
    fundpercentage: number;
  }[];
}