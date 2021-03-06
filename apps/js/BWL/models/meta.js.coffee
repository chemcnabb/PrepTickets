throw "Can't use BWL.Models.Meta without BWL and BWL.Models modules loaded" unless BWL? && BWL.Models?

BWL.Models.AccessRequest?.Meta = 
  __cache: 0
  __perms: 
    Create: 10
    Read: 10
    Update: 30
    Delete: 100
    Remove: 30
  CanRespond: 'Boolean*(10)'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  RequestedAccess: 'ModelsAccessTypeEnum*(10)'
  RequestedByKey: 'String*(10)'
  RequestedByName: 'String*(10)'
  RequestedItem: 'IDomainObject*(10)'
  Response: 'AccessRequestResponseEnum*(10)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.AccountProfile?.Meta = 
  __cache: 0
  __perms: 
    Create: 0
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Active: 'Boolean*(0)'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Email: 'String'
  EmailVerified: 'Boolean*(0)'
  FirstName: 'String'
  FullName: 'String*(0)'
  Key: 'String'
  LastName: 'String'
  PasswordHash: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Address?.Meta = 
  __cache: 300
  __perms: 
    Create: 10
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  AddressLine1: 'String'
  AddressLine2: 'String'
  AddressType: 'AddressTypeEnum'
  City: 'String'
  Country: 'String'
  County: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  District: 'String'
  IsConfirmed: 'Boolean'
  Key: 'String'
  Latitude: 'Double'
  Longitude: 'Double'
  PostalCode: 'String'
  Region: 'String'
  StoreKey: 'String'
  Timezone: 'String'
  Type: 'String'

BWL.Models.AuthAccessToken?.Meta = 
  __cache: 0
  __perms: 
    Create: 0
    Read: 30
    Update: 30
    Delete: 100
    Remove: 30
  ClientIP: 'String'
  ClientKey: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DisplayType: 'String'
  Key: 'String'
  ProviderId: 'String'
  ProviderType: 'String'
  SessionKey: 'String'
  State: 'AuthTokenStateEnum*(10)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.AuthProfile?.Meta = 
  __cache: 300
  __perms: 
    Create: 0
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DateOfBirth: 'DateOnly'
  EmailAddress: 'String'
  FirstName: 'String'
  FullName: 'String'
  Gender: 'GenderEnum'
  Key: 'String'
  LastName: 'String'
  ProviderAccessToken: 'String*(10)'
  ProviderId: 'String*(10)'
  ProviderType: 'String*(10)'
  ProviderVerified: 'Boolean*(10)'
  PublicImageURL: 'String*(10)'
  PublicProfileURL: 'String*(10)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.AuthSession?.Meta = 
  __cache: 0
  __perms: 
    Create: 0
    Read: 0
    Update: 0
    Delete: 0
    Remove: 0
  ClientIP: 'String'
  ClientKey: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DisplayType: 'String'
  Key: 'String'
  ProviderAccessSecret: 'String'
  ProviderAccessToken: 'String'
  ProviderAccessVerifier: 'String'
  ProviderId: 'String'
  ProviderRequestSecret: 'String'
  ProviderRequestToken: 'String'
  ProviderType: 'String'
  RedirectURL: 'String'
  SessionType: 'AuthSessionTypeEnum'
  State: 'AuthSessionStateEnum'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Cart?.Meta = 
  __cache: 0
  __perms: 
    Create: 10
    Read: 30
    Update: 30
    Delete: 100
    Remove: 30
  Currency: 'String*(10)'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  ExpiryDateTime: 'DateTime*(10)'
  Fees: 'Price*(10)'
  InventoryItems: 'List(IInventoryItem)*(10)'
  Key: 'String'
  Order: 'IOrder*(10)'
  Payment: 'IPaymentSession*(10)'
  ProfileKey: 'String*(10)'
  RequiresShipping: 'Boolean*(10)'
  Shipping: 'Price*(10)'
  ShippingAddress: 'IAddress*(10)'
  State: 'CartStateEnum*(10)'
  StoreKey: 'String'
  SubTotal: 'Price*(10)'
  Taxes: 'Price*(10)'
  Total: 'Price*(10)'
  Type: 'String'

BWL.Models.Category?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  ChildCategories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  Image: 'IImage'
  Key: 'String'
  Name: 'String'
  ParentCategoryKey: 'String'
  RankingScore: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.City?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  CountryISO: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  geonameId: 'String'
  Key: 'String'
  Latitude: 'Double'
  Longitude: 'Double'
  Name: 'String'
  NameUpper: 'String'
  NameUTF8: 'String'
  Population: 'Int64'
  Region: 'IRegion'
  RegionCode: 'String'
  RegionISO: 'String'
  StoreKey: 'String'
  Timezone: 'ITimezone'
  TimezoneName: 'String'
  Type: 'String'

BWL.Models.Contact?.Meta = 
  __cache: 300
  __perms: 
    Create: 10
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Addresses: 'List(IAddress)'
  Age: 'Int32*(0)'
  AlternativePhone: 'String'
  CompanyName: 'String'
  ContactRole: 'ContactRoleEnum'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DateOfBirth: 'DateOnly'
  EmailAddress: 'String'
  Facsimile: 'String'
  FirstName: 'String'
  FullName: 'String'
  Gender: 'GenderEnum'
  Image: 'IImage'
  Key: 'String'
  LastName: 'String'
  Phone: 'String'
  PreferredName: 'String'
  PrimaryAddress: 'IAddress'
  StoreKey: 'String'
  Type: 'String'
  WebAddress: 'String'

BWL.Models.ContainerConfiguration?.Meta = 
  __cache: 0
  __perms: 
    Create: 100
    Read: 0
    Update: 100
    Delete: 100
    Remove: 100
  ConfigurationKey: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Host: 'String'
  Key: 'String'
  StoreKey: 'String'
  Type: 'String'
  Value: 'String'

BWL.Models.Continent?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  geonameId: 'String'
  ISO: 'String'
  Key: 'String'
  Name: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Copyright?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Contacts: 'List(IContact)'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  HolderName: 'String'
  Key: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Country?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  AreaSqKM: 'Int32'
  Capital: 'String'
  ContinentISO: 'String'
  CurrencyCode: 'String'
  CurrencyName: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Fips: 'String'
  geonameId: 'String'
  HasCities: 'Boolean'
  HasPostalCodes: 'Boolean'
  HasRegions: 'Boolean'
  ISO: 'String'
  ISO3: 'String'
  ISONumeric: 'String'
  Key: 'String'
  Languages: 'String'
  Name: 'String'
  Neighbours: 'String'
  Phone: 'String'
  Population: 'Int64'
  PostalCodeFormat: 'String'
  PostalCodeRegex: 'String'
  StoreKey: 'String'
  TLD: 'String'
  Type: 'String'

BWL.Models.Currency?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DecimalPlaces: 'Int32'
  DecimalSeparator: 'Char'
  HTMLCharacter: 'String'
  ISO: 'String'
  Key: 'String'
  Name: 'String'
  PrefixCharacter: 'Boolean'
  StoreKey: 'String'
  ThousandsSeparator: 'Char'
  ToUSDConversionRate: 'Double'
  Type: 'String'
  UnicodeCharacter: 'String'

BWL.Models.CustomURI?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  StoreKey: 'String'
  Type: 'String'
  URI: 'String'

BWL.Models.DigitalSource?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  BaseURL: 'String*(0)'
  Copyright: 'ICopyright'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Filename: 'String*(40)'
  FileSize: 'Int64'
  Key: 'String'
  MimeInfo: 'MimeInfo*(40:40)'
  Name: 'String'
  SourceFile: 'String*(40)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.DomainProfile?.Meta = 
  __cache: 0
  __perms: 
    Create: 0
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  AccessToken: 'IAuthAccessToken*(10)'
  AuthProfiles: 'List(IAuthProfile)*(10)'
  Contact: 'IContact'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DomainProfileId: 'Int64'
  Key: 'String'
  LastLogoff: 'DateTime*(10)'
  LastLogon: 'DateTime*(10)'
  ProfileRole: 'DomainProfileRoleEnum*(10)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Event?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  ChildEvents: 'List(IEvent)*(0)'
  Contacts: 'List(IContact)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EndTime: 'DateTime'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaximumCapacity: 'Int32'
  Name: 'String'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  ParentEvent: 'IEvent*(0)'
  Places: 'List(IPlace)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StartTime: 'DateTime'
  StoreKey: 'String'
  Type: 'String'
  WebLinks: 'List(IWebLink)'

BWL.Models.ExternalInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Facebook?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  FacebookType: 'FacebookTypeEnum'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Fee?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Amount: 'Double'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  Name: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.File?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  BaseURL: 'String*(0)'
  Copyright: 'ICopyright'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Filename: 'String*(40)'
  FileSize: 'Int64'
  Key: 'String'
  MimeInfo: 'MimeInfo*(40:40)'
  Name: 'String'
  SourceFile: 'String*(40)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Flickr?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.GeneralAdmissionTicketInventoryItem?.Meta = 
  __cache: 0
  __perms: 
    Create: 20
    Read: 10
    Update: 10
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DownloadLink: 'String'
  EventKey: 'String'
  EventName: 'String'
  Info: 'String'
  IsLocked: 'Boolean*(0)'
  IsSold: 'Boolean*(0)'
  ItemInfoKey: 'String'
  ItemInfoName: 'String'
  ItemInfoPrice: 'Price'
  ItemInfoType: 'String'
  Key: 'String'
  LockExpiryDateTime: 'DateTime'
  LockingDomainProfileKey: 'String*(40:40)'
  Options: 'List(ItemOptionResponse)'
  ScanDateTime: 'DateTime'
  ScanDeviceKey: 'String'
  SoldDateTime: 'DateTime'
  SoldToDomainProfileKey: 'String*(40:40)'
  StoreKey: 'String'
  Type: 'String'
  UIID: 'Int64*(40)'

BWL.Models.GeneralAdmissionTicketItemInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EventKey: 'String*(0)'
  EventName: 'String*(0)'
  InventoryKey: 'String*(0)'
  IsTaxable: 'Boolean'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaxPurchaseQuantity: 'Int32'
  Name: 'String'
  NumberAvailable: 'Int64*(0)'
  NumberTotal: 'Int64'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  Options: 'List(IItemOptionRequest)'
  ParentItem: 'IItemInfo'
  Policy: 'Text'
  PreviewImages: 'List(IImage:0:0)'
  Price: 'Price'
  PricingParent: 'IItemInfo'
  PricingTiers: 'List(IItemInfo)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SalePrice: 'Price'
  SalePriority: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  TaxRules: 'List(ITaxRule)'
  TicketTemplate: 'ITicketTemplate*(40:40)'
  Type: 'String'
  Unlimited: 'Boolean'

BWL.Models.Image?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  BaseURL: 'String*(0)'
  Copyright: 'ICopyright'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DPI: 'Int32'
  Filename: 'String*(40)'
  FileSize: 'Int64'
  HeightPX: 'Int32'
  ImageFile: 'String*(0)'
  Key: 'String'
  MimeInfo: 'MimeInfo*(40:40)'
  Name: 'String'
  SourceFile: 'String*(40)'
  StoreKey: 'String'
  ThumbFile: 'String*(0)'
  Type: 'String'
  WidthPX: 'Int32'

BWL.Models.InventoryItem?.Meta = 
  __cache: 0
  __perms: 
    Create: 20
    Read: 10
    Update: 10
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  EventKey: 'String'
  EventName: 'String'
  IsLocked: 'Boolean*(0)'
  IsSold: 'Boolean*(0)'
  ItemInfoKey: 'String'
  ItemInfoName: 'String'
  ItemInfoPrice: 'Price'
  ItemInfoType: 'String'
  Key: 'String'
  LockExpiryDateTime: 'DateTime'
  LockingDomainProfileKey: 'String*(40:40)'
  Options: 'List(ItemOptionResponse)'
  SoldDateTime: 'DateTime'
  SoldToDomainProfileKey: 'String*(40:40)'
  StoreKey: 'String'
  Type: 'String'
  UIID: 'Int64*(40)'

BWL.Models.ItemInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EventKey: 'String*(0)'
  EventName: 'String*(0)'
  InventoryKey: 'String*(0)'
  IsTaxable: 'Boolean'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaxPurchaseQuantity: 'Int32'
  Name: 'String'
  NumberAvailable: 'Int64*(0)'
  NumberTotal: 'Int64'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  Options: 'List(IItemOptionRequest)'
  ParentItem: 'IItemInfo'
  PreviewImages: 'List(IImage:0:0)'
  Price: 'Price'
  PricingParent: 'IItemInfo'
  PricingTiers: 'List(IItemInfo)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SalePrice: 'Price'
  SalePriority: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  TaxRules: 'List(ITaxRule)'
  Type: 'String'
  Unlimited: 'Boolean'

BWL.Models.ItemOptionRequest?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DisplayOrder: 'Int32'
  Key: 'String'
  OptionType: 'String'
  Price: 'Price'
  Required: 'Boolean'
  StoreKey: 'String'
  Text: 'String'
  Type: 'String'
  Value: 'String'

BWL.Models.ItemOptionResponse?.Meta = 
  __cache: 0
  Key: 'String'
  OptionType: 'String'
  Price: 'Price'
  Text: 'String'
  Type: 'String'
  Value: 'String'

BWL.Models.LastFM?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  LastFMType: 'LastFMTypeEnum'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.LinkedIn?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  LinkedInType: 'LinkedInTypeEnum'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.MySpace?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Order?.Meta = 
  __cache: 300
  __perms: 
    Create: 10
    Read: 30
    Update: 40
    Delete: 100
    Remove: 40
  Contact: 'IContact'
  Currency: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DomainProfileKey: 'String'
  Fees: 'Price'
  Fulfilled: 'DateTime'
  InventoryItems: 'List(IInventoryItem)'
  Key: 'String'
  OrderId: 'Int64'
  Placed: 'DateTime'
  RequiresShipping: 'Boolean'
  Shipped: 'DateTime'
  Shipping: 'Price'
  ShippingAddress: 'IAddress'
  State: 'OrderStateEnum'
  StoreKey: 'String'
  SubTotal: 'Price'
  Taxes: 'Price'
  Total: 'Price'
  Transactions: 'List(ITransaction)'
  Type: 'String'

BWL.Models.PaymentProvider?.Meta = 
  __cache: 300
  __perms: 
    Create: 10
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Currency: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  MaximumCharge: 'Price'
  MinimumCharge: 'Price'
  OnApprovedOrderState: 'OrderStateEnum'
  Policy: 'Text'
  ProviderId: 'String*(40:40)'
  ProviderToken: 'String*(40:40)'
  ProviderType: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.PaymentSession?.Meta = 
  __cache: 0
  __perms: 
    Create: 10
    Read: 30
    Update: 30
    Delete: 100
    Remove: 30
  Amount: 'Price'
  AuthToken: 'String'
  CartKey: 'String'
  ClientIP: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DisplayType: 'String'
  Key: 'String'
  Message: 'String'
  PaymentSessionId: 'Int64'
  ProfileKey: 'String'
  ProviderReceipt: 'String'
  ProviderType: 'String'
  RedirectURL: 'String'
  State: 'PaymentSessionStateEnum'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Place?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Address: 'IAddress'
  Contacts: 'List(IContact)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  Name: 'String'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.PostalCode?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  CityName: 'String'
  Code: 'String'
  CountryISO: 'String'
  County: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  District: 'String'
  Key: 'String'
  Latitude: 'Double'
  Longitude: 'Double'
  Region: 'IRegion'
  RegionISO: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Price?.Meta = 
  __cache: 0
  Currency: 'String'
  Display: 'String'
  ItemPrice: 'Double'
  Type: 'String'

BWL.Models.Region?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  Code: 'String'
  Country: 'ICountry'
  CountryISO: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  geonameId: 'String'
  ISO: 'String'
  Key: 'String'
  Name: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.RegionSet?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  Name: 'String'
  Regions: 'List(IRegion)'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.RegistrationInventoryItem?.Meta = 
  __cache: 0
  __perms: 
    Create: 20
    Read: 10
    Update: 10
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  EventKey: 'String'
  EventName: 'String'
  IsLocked: 'Boolean*(0)'
  IsSold: 'Boolean*(0)'
  ItemInfoKey: 'String'
  ItemInfoName: 'String'
  ItemInfoPrice: 'Price'
  ItemInfoType: 'String'
  Key: 'String'
  LockExpiryDateTime: 'DateTime'
  LockingDomainProfileKey: 'String*(40:40)'
  Options: 'List(ItemOptionResponse)'
  SoldDateTime: 'DateTime'
  SoldToDomainProfileKey: 'String*(40:40)'
  StoreKey: 'String'
  Type: 'String'
  UIID: 'Int64*(40)'

BWL.Models.RegistrationItemInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EventKey: 'String*(0)'
  EventName: 'String*(0)'
  InventoryKey: 'String*(0)'
  IsTaxable: 'Boolean'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaxPurchaseQuantity: 'Int32'
  Name: 'String'
  NumberAvailable: 'Int64*(0)'
  NumberTotal: 'Int64'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  Options: 'List(IItemOptionRequest)'
  ParentItem: 'IItemInfo'
  PreviewImages: 'List(IImage:0:0)'
  Price: 'Price'
  PricingParent: 'IItemInfo'
  PricingTiers: 'List(IItemInfo)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SalePrice: 'Price'
  SalePriority: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  TaxRules: 'List(ITaxRule)'
  Type: 'String'
  Unlimited: 'Boolean'

BWL.Models.ScanDevice?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Active: 'Boolean'
  Description: 'Text'
  DeviceInfo: 'ScanDeviceInfo*(40:40)'
  Events: 'List(IEvent)*(40:40)'
  LastSyncDateTime: 'DateTime'
  Name: 'String'

BWL.Models.ScanEventInfo?.Meta = 
  __cache: 0
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  EventDateTime: 'DateTime'
  Key: 'String'
  Name: 'String'
  PlaceName: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.ScanTicket?.Meta = 
  __cache: 0
  Info: 'String'
  ScanDateTime: 'DateTime'
  ScanDeviceKey: 'String'
  SyncDateModified: 'DateTime'
  TicketInfoKey: 'String'
  Valid: 'Boolean'
  ValidationHash: 'String'

BWL.Models.ScanTicketInfo?.Meta = 
  __cache: 0
  Name: 'String'

BWL.Models.SearchIndex?.Meta = 
  __cache: 300
  __perms: 
    Create: 90
    Read: 0
    Update: 90
    Delete: 90
    Remove: 90
  Categories: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'String'
  IsSalePrice: 'Boolean'
  ItemDateModified: 'DateTime'
  ItemKey: 'String'
  ItemType: 'String'
  Key: 'String'
  Locations: 'String'
  Name: 'String'
  Price: 'Price'
  SearchPriority: 'Int32'
  SearchTags: 'String'
  SearchText: 'String'
  StoreKey: 'String'
  Type: 'String'
  URI: 'String'

BWL.Models.SponsorshipInventoryItem?.Meta = 
  __cache: 0
  __perms: 
    Create: 20
    Read: 10
    Update: 10
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  EventKey: 'String'
  EventName: 'String'
  IsLocked: 'Boolean*(0)'
  IsSold: 'Boolean*(0)'
  ItemInfoKey: 'String'
  ItemInfoName: 'String'
  ItemInfoPrice: 'Price'
  ItemInfoType: 'String'
  Key: 'String'
  LockExpiryDateTime: 'DateTime'
  LockingDomainProfileKey: 'String*(40:40)'
  Options: 'List(ItemOptionResponse)'
  SoldDateTime: 'DateTime'
  SoldToDomainProfileKey: 'String*(40:40)'
  StoreKey: 'String'
  Type: 'String'
  UIID: 'Int64*(40)'

BWL.Models.SponsorshipItemInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EventKey: 'String*(0)'
  EventName: 'String*(0)'
  InventoryKey: 'String*(0)'
  IsTaxable: 'Boolean'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaxPurchaseQuantity: 'Int32'
  Name: 'String'
  NumberAvailable: 'Int64*(0)'
  NumberTotal: 'Int64'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  Options: 'List(IItemOptionRequest)'
  ParentItem: 'IItemInfo'
  PreviewImages: 'List(IImage:0:0)'
  Price: 'Price'
  PricingParent: 'IItemInfo'
  PricingTiers: 'List(IItemInfo)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SalePrice: 'Price'
  SalePriority: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  TaxRules: 'List(ITaxRule)'
  Type: 'String'
  Unlimited: 'Boolean'

BWL.Models.Store?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Address: 'IAddress'
  Categories: 'List(ICategory)'
  Contacts: 'List(IContact)'
  Currency: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Events: 'List(IEvent)'
  ExternalInfos: 'List(IExternalInfo)'
  HasAccounts: 'Boolean'
  HasWishlist: 'Boolean'
  IsOwner: 'Boolean*(0)'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeBannerImages: 'List(IImage:1024:150)'
  LargeImages: 'List(IImage:500:500)'
  Name: 'String'
  PaymentProviders: 'List(IPaymentProvider)'
  Public: 'Boolean'
  SearchPriority: 'Int32'
  SmallBannerImage: 'IImage:520:150'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  StoreURIs: 'List(IStoreURI)'
  TaxRules: 'List(ITaxRule)'
  Type: 'String'
  WebLinks: 'List(IWebLink)'

BWL.Models.StoreConfiguration?.Meta = 
  __cache: 0
  ConfigurationKey: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  StoreKey: 'String'
  Type: 'String'
  Value: 'String'

BWL.Models.StorePreRegister?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  AddressLine1: 'String'
  AddressLine2: 'String'
  City: 'String'
  ContactName: 'String'
  Country: 'String'
  County: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  District: 'String'
  EmailAddress: 'String'
  Facebook: 'String'
  Key: 'String'
  Latitude: 'Double'
  LinkedIn: 'String'
  Longitude: 'Double'
  Name: 'String'
  Phone: 'String'
  PostalCode: 'String'
  Region: 'String'
  StoreKey: 'String'
  StoreURI: 'String'
  Timezone: 'String'
  Twitter: 'String'
  Type: 'String'
  WebAddress: 'String'

BWL.Models.StoreURI?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  StoreKey: 'String'
  Type: 'String'
  URI: 'String'

BWL.Models.Tax?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Code: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  IsTaxonTax: 'Boolean'
  Key: 'String'
  Name: 'String'
  Number: 'String'
  Percent: 'Double'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.TaxRule?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  CityKey: 'String'
  CountryKey: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  RegionKey: 'String'
  StoreKey: 'String'
  Taxes: 'List(ITax)'
  Type: 'String'

BWL.Models.TicketInventoryItem?.Meta = 
  __cache: 0
  __perms: 
    Create: 20
    Read: 10
    Update: 10
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DownloadLink: 'String'
  EventKey: 'String'
  EventName: 'String'
  Info: 'String'
  IsLocked: 'Boolean*(0)'
  IsSold: 'Boolean*(0)'
  ItemInfoKey: 'String'
  ItemInfoName: 'String'
  ItemInfoPrice: 'Price'
  ItemInfoType: 'String'
  Key: 'String'
  LockExpiryDateTime: 'DateTime'
  LockingDomainProfileKey: 'String*(40:40)'
  Options: 'List(ItemOptionResponse)'
  ScanDateTime: 'DateTime'
  ScanDeviceKey: 'String'
  SoldDateTime: 'DateTime'
  SoldToDomainProfileKey: 'String*(40:40)'
  StoreKey: 'String'
  Type: 'String'
  UIID: 'Int64*(40)'

BWL.Models.TicketItemInfo?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  Categories: 'List(ICategory)'
  CustomURI: 'ICustomURI'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  DisplayOrder: 'Int32'
  EventKey: 'String*(0)'
  EventName: 'String*(0)'
  InventoryKey: 'String*(0)'
  IsTaxable: 'Boolean'
  Items: 'List(IItemInfo)'
  Key: 'String'
  LargeImages: 'List(IImage:500:500)'
  MaxPurchaseQuantity: 'Int32'
  Name: 'String'
  NumberAvailable: 'Int64*(0)'
  NumberTotal: 'Int64'
  OnSaleDateTimeEnd: 'DateTime'
  OnSaleDateTimeStart: 'DateTime'
  Options: 'List(IItemOptionRequest)'
  ParentItem: 'IItemInfo'
  Policy: 'Text'
  PreviewImages: 'List(IImage:0:0)'
  Price: 'Price'
  PricingParent: 'IItemInfo'
  PricingTiers: 'List(IItemInfo)'
  Public: 'Boolean'
  RankingScore: 'Int32'
  SalePrice: 'Price'
  SalePriority: 'Int32'
  SearchPriority: 'Int32'
  SmallImage: 'IImage:150:150'
  StoreKey: 'String'
  TaxRules: 'List(ITaxRule)'
  TicketTemplate: 'ITicketTemplate*(40:40)'
  Type: 'String'
  Unlimited: 'Boolean'

BWL.Models.TicketTemplate?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 20
    Update: 30
    Delete: 100
    Remove: 30
  BackgroundColorHex: 'String'
  CustomTemplateImage: 'IImage:1200:375*(40:40)'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  FontColorHex: 'String'
  FontType: 'String'
  Horizontal: 'Boolean'
  IncludeDetails: 'Boolean'
  IncludeQRCode: 'Boolean'
  IncludeSeatInfo: 'Boolean'
  IncludeTerms: 'Boolean'
  IncludeTicketImage: 'Boolean'
  IncludeTicketName: 'Boolean'
  Key: 'String'
  StoreKey: 'String'
  Template: 'String'
  Type: 'String'

BWL.Models.Timezone?.Meta = 
  __cache: 3600
  __perms: 
    Create: 70
    Read: 0
    Update: 70
    Delete: 100
    Remove: 70
  CountryISO: 'String'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  DSTOffset: 'Double'
  GMTOffset: 'Double'
  Key: 'String'
  Name: 'String'
  RawOffset: 'Double'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.Transaction?.Meta = 
  __cache: 300
  __perms: 
    Create: 10
    Read: 30
    Update: 40
    Delete: 100
    Remove: 40
  Amount: 'Price'
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Key: 'String'
  Message: 'String'
  ProviderReceipt: 'String'
  ProviderType: 'String'
  State: 'TransactionStateEnum'
  StoreKey: 'String'
  TransactionId: 'Int64'
  Type: 'String'

BWL.Models.Twitter?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.WebLink?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  StoreKey: 'String'
  Type: 'String'
  URL: 'String'

BWL.Models.Wishlist?.Meta = 
  __cache: 0
  __perms: 
    Create: 10
    Read: 30
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Items: 'List(IDomainObject)'
  Key: 'String'
  ProfileKey: 'String'
  StoreKey: 'String'
  Type: 'String'

BWL.Models.YouTube?.Meta = 
  __cache: 300
  __perms: 
    Create: 20
    Read: 0
    Update: 30
    Delete: 100
    Remove: 30
  DateCreated: 'DateTime'
  DateModified: 'DateTime'
  Description: 'Text'
  Key: 'String'
  Name: 'String'
  ProviderId: 'String'
  StoreKey: 'String'
  Type: 'String'
