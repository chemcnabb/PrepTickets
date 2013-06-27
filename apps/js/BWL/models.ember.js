
var GraphObject = Ember.Object.extend({
    Type: 'GraphObject',
    DateCreated: null,
    DateModified: null,
    IsMarkedRemove: false,
    Key: null,
    StoreKey: null,
    _perms: null,
    _rels: null
});
var ExternalInfo = App.GraphObject.extend({
    Type: 'ExternalInfo',
    ProviderId: null,
    Name: null,
    Description: null
});
var ItemInfo = App.GraphObject.extend({
    Type: 'ItemInfo',
    Public: false,
    SearchPriority: 0,
    OnSaleDateTimeStart: null,
    OnSaleDateTimeEnd: null,
    ShowCountdown: false,
    SalePriority: 0,
    Price: null,
    SalePrice: null,
    TaxRules: null,
    IsTaxable: false,
    LargeImages: null,
    PreviewImages: null,
    SmallImage: null,
    NumberTotal: 0,
    MaxPurchaseQuantity: 0,
    Unlimited: false,
    CustomURI: null,
    DisplayOrder: 0,
    RankingScore: 0,
    Items: null,
    ParentItem: null,
    PricingTiers: null,
    PricingParent: null,
    InventoryKey: null,
    NumberAvailable: 0,
    EventName: null,
    EventKey: null,
    Name: null,
    Description: null,
    Categories: null,
    Options: null
});
var InventoryItem = App.GraphObject.extend({
    Type: 'InventoryItem',
    EventName: null,
    EventKey: null,
    ItemInfoName: null,
    ItemInfoKey: null,
    ItemInfoType: null,
    InventoryItemInfoKey: null,
    InventoryItemInfoType: null,
    ItemInfoPrice: null,
    IsSold: false,
    SoldToDomainProfileKey: null,
    SoldDateTime: null,
    IsLocked: false,
    LockingDomainProfileKey: null,
    LockExpiryDateTime: null,
    UIID: 0,
    Options: null
});
var DigitalSource = App.GraphObject.extend({
    Type: 'DigitalSource',
    Name: null,
    Description: null,
    BaseURL: null,
    SourceFile: null,
    Filename: null,
    MimeInfo: null,
    FileSize: 0,
    Copyright: null
});
var TicketItemInfo = App.ItemInfo.extend({
    Type: 'TicketItemInfo',
    Policy: null,
    TicketTemplate: null
});
var TicketInventoryItem = App.InventoryItem.extend({
    Type: 'TicketInventoryItem',
    DownloadLink: null,
    ScanDateTime: null,
    ScanDeviceKey: null,
    Info: null
});
var AccessRequest = App.GraphObject.extend({
    Type: 'AccessRequest',
    RequestedByKey: null,
    RequestedByName: null,
    RequestedBy: null,
    RequestSentToKeys: null,
    RequestedItem: null,
    RequestedAccess: null,
    CanRespond: false,
    Response: null,
    ResponseFromKey: null,
    ResponseFrom: null
});
var AccountProfile = App.GraphObject.extend({
    Type: 'AccountProfile',
    FirstName: null,
    LastName: null,
    FullName: null,
    Email: null,
    PasswordHash: null,
    RequestedRole: null,
    EmailVerified: false,
    Active: false,
    DomainProfile: null
});
var Address = App.GraphObject.extend({
    Type: 'Address',
    IsConfirmed: false,
    AddressLine1: null,
    AddressLine2: null,
    AddressType: null,
    Latitude: 0,
    Longitude: 0,
    PostalCode: null,
    District: null,
    County: null,
    City: null,
    Region: null,
    Country: null,
    Timezone: null
});
var AuthAccessToken = App.GraphObject.extend({
    Type: 'AuthAccessToken',
    ClientIP: null,
    ClientKey: null,
    DisplayType: null,
    ProviderType: null,
    ProviderId: null,
    SessionKey: null,
    State: null
});
var AuthProfile = App.GraphObject.extend({
    Type: 'AuthProfile',
    FirstName: null,
    LastName: null,
    FullName: null,
    EmailAddress: null,
    DateOfBirth: null,
    Gender: null,
    ProviderType: null,
    ProviderId: null,
    ProviderVerified: false,
    ProviderAccessToken: null,
    PublicImageURL: null,
    PublicProfileURL: null,
    ProviderAccessSecret: null,
    DomainProfile: null
});
var AuthSession = App.GraphObject.extend({
    Type: 'AuthSession',
    ClientIP: null,
    ClientKey: null,
    DisplayType: null,
    State: null,
    SessionType: null,
    ProviderType: null,
    ProviderRequestToken: null,
    ProviderRequestSecret: null,
    ProviderAccessToken: null,
    ProviderAccessSecret: null,
    ProviderAccessVerifier: null,
    ProviderId: null,
    RedirectURL: null
});
var Cart = App.GraphObject.extend({
    Type: 'Cart',
    ProfileKey: null,
    ExpiryDateTime: null,
    InventoryItems: null,
    Currency: null,
    RequiresShipping: false,
    ShippingAddress: null,
    State: null,
    SubTotal: null,
    Taxes: null,
    Shipping: null,
    Fees: null,
    Total: null,
    Payment: null,
    Order: null
});
var Category = App.GraphObject.extend({
    Type: 'Category',
    ChildCategories: null,
    ParentCategoryKey: null,
    SmallImage: null,
    CustomURI: null,
    DisplayOrder: 0,
    RankingScore: 0,
    Name: null,
    Description: null,
    Image: null
});
var City = App.GraphObject.extend({
    Type: 'City',
    Name: null,
    NameUTF8: null,
    NameUpper: null,
    Latitude: 0,
    Longitude: 0,
    Region: null,
    RegionISO: null,
    CountryISO: null,
    RegionCode: null,
    geonameId: null,
    Population: 0,
    Timezone: null,
    TimezoneName: null
});
var Contact = App.GraphObject.extend({
    Type: 'Contact',
    FirstName: null,
    LastName: null,
    FullName: null,
    PreferredName: null,
    CompanyName: null,
    Phone: null,
    Facsimile: null,
    AlternativePhone: null,
    WebAddress: null,
    EmailAddress: null,
    DateOfBirth: null,
    Age: 0,
    Gender: null,
    ContactRole: null,
    Addresses: null,
    PrimaryAddress: null,
    Image: null
});
var ContainerConfiguration = App.GraphObject.extend({
    Type: 'ContainerConfiguration',
    Host: null,
    ConfigurationKey: null,
    Value: null
});
var Continent = App.GraphObject.extend({
    Type: 'Continent',
    Name: null,
    ISO: null,
    geonameId: null
});
var Copyright = App.GraphObject.extend({
    Type: 'Copyright',
    HolderName: null,
    Contacts: null
});
var Country = App.GraphObject.extend({
    Type: 'Country',
    Name: null,
    ISO: null,
    ISO3: null,
    ISONumeric: null,
    Fips: null,
    Capital: null,
    AreaSqKM: 0,
    Population: 0,
    TLD: null,
    CurrencyCode: null,
    CurrencyName: null,
    Phone: null,
    PostalCodeFormat: null,
    PostalCodeRegex: null,
    Languages: null,
    Neighbours: null,
    geonameId: null,
    ContinentISO: null,
    HasCities: false,
    HasPostalCodes: false,
    HasRegions: false
});
var Currency = App.GraphObject.extend({
    Type: 'Currency',
    Name: null,
    ISO: null,
    ToUSDConversionRate: 0,
    HTMLCharacter: null,
    UnicodeCharacter: null,
    DecimalPlaces: 0,
    ThousandsSeparator: null,
    DecimalSeparator: null,
    PrefixCharacter: false
});
var CustomURI = App.GraphObject.extend({
    Type: 'CustomURI',
    URI: null
});
var DigitalSource = App.GraphObject.extend({
    Type: 'DigitalSource',
    Name: null,
    Description: null,
    BaseURL: null,
    SourceFile: null,
    Filename: null,
    MimeInfo: null,
    FileSize: 0,
    Copyright: null
});
var DomainProfile = App.GraphObject.extend({
    Type: 'DomainProfile',
    DomainProfileId: 0,
    ProfileRole: null,
    LastLogon: null,
    LastLogoff: null,
    AccessToken: null,
    Contact: null,
    AuthProfiles: null
});
var Event = App.GraphObject.extend({
    Type: 'Event',
    Public: false,
    SearchPriority: 0,
    OnSaleDateTimeStart: null,
    OnSaleDateTimeEnd: null,
    StartTime: null,
    EndTime: null,
    LargeImages: null,
    SmallImage: null,
    ParentEvent: null,
    ChildEvents: null,
    CustomURI: null,
    DisplayOrder: 0,
    RankingScore: 0,
    MaximumCapacity: 0,
    Name: null,
    Description: null,
    WebLinks: null,
    Contacts: null,
    Places: null,
    Items: null,
    Categories: null
});
var ExternalInfo = App.GraphObject.extend({
    Type: 'ExternalInfo',
    ProviderId: null,
    Name: null,
    Description: null
});
var Facebook = App.ExternalInfo.extend({
    Type: 'Facebook',
    FacebookType: null
});
var Fee = App.GraphObject.extend({
    Type: 'Fee',
    Name: null,
    Amount: 0
});
var File = App.DigitalSource.extend({
    Type: 'File'
});
var Flickr = App.ExternalInfo.extend({
    Type: 'Flickr'
});
var GeneralAdmissionTicketInventoryItem = App.TicketInventoryItem.extend({
    Type: 'GeneralAdmissionTicketInventoryItem'
});
var GeneralAdmissionTicketItemInfo = App.TicketItemInfo.extend({
    Type: 'GeneralAdmissionTicketItemInfo'
});
var Image = App.DigitalSource.extend({
    Type: 'Image',
    DPI: 0,
    ThumbFile: null,
    ImageFile: null,
    HeightPX: 0,
    WidthPX: 0
});
var InventoryItem = App.GraphObject.extend({
    Type: 'InventoryItem',
    EventName: null,
    EventKey: null,
    ItemInfoName: null,
    ItemInfoKey: null,
    ItemInfoType: null,
    InventoryItemInfoKey: null,
    InventoryItemInfoType: null,
    ItemInfoPrice: null,
    IsSold: false,
    SoldToDomainProfileKey: null,
    SoldDateTime: null,
    IsLocked: false,
    LockingDomainProfileKey: null,
    LockExpiryDateTime: null,
    UIID: 0,
    Options: null
});
var ItemInfo = App.GraphObject.extend({
    Type: 'ItemInfo',
    Public: false,
    SearchPriority: 0,
    OnSaleDateTimeStart: null,
    OnSaleDateTimeEnd: null,
    ShowCountdown: false,
    SalePriority: 0,
    Price: null,
    SalePrice: null,
    TaxRules: null,
    IsTaxable: false,
    LargeImages: null,
    PreviewImages: null,
    SmallImage: null,
    NumberTotal: 0,
    MaxPurchaseQuantity: 0,
    Unlimited: false,
    CustomURI: null,
    DisplayOrder: 0,
    RankingScore: 0,
    Items: null,
    ParentItem: null,
    PricingTiers: null,
    PricingParent: null,
    InventoryKey: null,
    NumberAvailable: 0,
    EventName: null,
    EventKey: null,
    Name: null,
    Description: null,
    Categories: null,
    Options: null
});
var ItemOptionRequest = App.GraphObject.extend({
    Type: 'ItemOptionRequest',
    OptionType: null,
    Required: false,
    Text: null,
    Value: null,
    Price: null,
    DisplayOrder: 0
});
var ItemOptionResponse = Ember.Object.extend({
    Type: 'ItemOptionResponse',
    Key: null,
    OptionType: null,
    Text: null,
    Value: null,
    Price: null
});
var LastFM = App.ExternalInfo.extend({
    Type: 'LastFM',
    LastFMType: null
});
var LinkedIn = App.ExternalInfo.extend({
    Type: 'LinkedIn',
    LinkedInType: null
});
var MySpace = App.ExternalInfo.extend({
    Type: 'MySpace'
});
var Order = App.GraphObject.extend({
    Type: 'Order',
    Contact: null,
    DomainProfileKey: null,
    OrderId: 0,
    InventoryItems: null,
    Currency: null,
    RequiresShipping: false,
    ShippingAddress: null,
    State: null,
    SubTotal: null,
    Taxes: null,
    Shipping: null,
    Fees: null,
    Total: null,
    Placed: null,
    Shipped: null,
    Fulfilled: null,
    Transactions: null
});
var PaymentProvider = App.GraphObject.extend({
    Type: 'PaymentProvider',
    ProviderType: null,
    ProviderId: null,
    ProviderToken: null,
    Currency: null,
    Policy: null,
    MinimumCharge: null,
    MaximumCharge: null,
    OnApprovedOrderState: null
});
var PaymentSession = App.GraphObject.extend({
    Type: 'PaymentSession',
    PaymentSessionId: 0,
    ClientIP: null,
    ProfileKey: null,
    AuthToken: null,
    CartKey: null,
    DisplayType: null,
    State: null,
    ProviderType: null,
    ProviderReceipt: null,
    Amount: null,
    Message: null,
    RedirectURL: null
});
var Place = App.GraphObject.extend({
    Type: 'Place',
    Public: false,
    SearchPriority: 0,
    LargeImages: null,
    SmallImage: null,
    CustomURI: null,
    DisplayOrder: 0,
    RankingScore: 0,
    Name: null,
    Description: null,
    Address: null,
    Contacts: null
});
var PostalCode = App.GraphObject.extend({
    Type: 'PostalCode',
    Code: null,
    Latitude: 0,
    Longitude: 0,
    CityName: null,
    Region: null,
    RegionISO: null,
    CountryISO: null,
    District: null,
    County: null
});
var Price = Ember.Object.extend({
    Type: 'Price',
    Currency: null,
    ItemPrice: 0,
    Display: null
});
var Region = App.GraphObject.extend({
    Type: 'Region',
    Name: null,
    Code: null,
    ISO: null,
    Country: null,
    CountryISO: null,
    geonameId: null
});
var RegionSet = App.GraphObject.extend({
    Type: 'RegionSet',
    Name: null,
    Regions: null
});
var RegistrationInventoryItem = App.InventoryItem.extend({
    Type: 'RegistrationInventoryItem'
});
var RegistrationItemInfo = App.ItemInfo.extend({
    Type: 'RegistrationItemInfo'
});
var ScanDevice = App.GraphObject.extend({
    Type: 'ScanDevice',
    Name: null,
    Description: null,
    Active: false,
    DeviceInfo: null,
    Events: null,
    LastSyncDateTime: null
});
var ScanEventInfo = App.GraphObject.extend({
    Type: 'ScanEventInfo',
    Name: null,
    PlaceName: null,
    EventDateTime: null
});
var ScanTicket = App.GraphObject.extend({
    Type: 'ScanTicket',
    ValidationHash: null,
    Valid: false,
    Info: null,
    SyncDateModified: null,
    ScanDateTime: null,
    ScanDeviceKey: null,
    TicketInfoKey: null
});
var ScanTicketInfo = App.GraphObject.extend({
    Type: 'ScanTicketInfo',
    Name: null
});
var SearchIndex = App.GraphObject.extend({
    Type: 'SearchIndex',
    SearchPriority: 0,
    SearchText: null,
    SearchTags: null,
    ItemType: null,
    ItemKey: null,
    ItemDateModified: null,
    Name: null,
    Description: null,
    Locations: null,
    URI: null,
    Categories: null,
    Price: null,
    IsSalePrice: false
});
var SponsorshipInventoryItem = App.InventoryItem.extend({
    Type: 'SponsorshipInventoryItem'
});
var SponsorshipItemInfo = App.ItemInfo.extend({
    Type: 'SponsorshipItemInfo'
});
var Store = App.GraphObject.extend({
    Type: 'Store',
    Public: false,
    SearchPriority: 0,
    IsOwner: false,
    HasAccounts: false,
    HasWishlist: false,
    TaxRules: null,
    StoreURIs: null,
    Currency: null,
    Address: null,
    Contacts: null,
    LargeImages: null,
    SmallImage: null,
    LargeBannerImages: null,
    SmallBannerImage: null,
    Name: null,
    Description: null,
    ExternalInfos: null,
    Events: null,
    Categories: null,
    WebLinks: null,
    Items: null,
    PaymentProviders: null
});
var StoreConfiguration = App.GraphObject.extend({
    Type: 'StoreConfiguration',
    ConfigurationKey: null,
    Value: null
});
var StorePreRegister = App.GraphObject.extend({
    Type: 'StorePreRegister',
    Name: null,
    AddressLine1: null,
    AddressLine2: null,
    City: null,
    Country: null,
    County: null,
    District: null,
    Latitude: 0,
    Longitude: 0,
    PostalCode: null,
    Region: null,
    Timezone: null,
    EmailAddress: null,
    ContactName: null,
    Phone: null,
    WebAddress: null,
    Facebook: null,
    Twitter: null,
    LinkedIn: null,
    StoreURI: null
});
var StoreURI = App.GraphObject.extend({
    Type: 'StoreURI',
    URI: null
});
var Tax = App.GraphObject.extend({
    Type: 'Tax',
    Name: null,
    Code: null,
    Number: null,
    Percent: 0,
    IsTaxonTax: false
});
var TaxRule = App.GraphObject.extend({
    Type: 'TaxRule',
    Taxes: null,
    CityKey: null,
    RegionKey: null,
    CountryKey: null
});
var TicketInventoryItem = App.InventoryItem.extend({
    Type: 'TicketInventoryItem',
    DownloadLink: null,
    ScanDateTime: null,
    ScanDeviceKey: null,
    Info: null
});
var TicketItemInfo = App.ItemInfo.extend({
    Type: 'TicketItemInfo',
    Policy: null,
    TicketTemplate: null
});
var TicketTemplate = App.GraphObject.extend({
    Type: 'TicketTemplate',
    CustomTemplateImage: null,
    Horizontal: false,
    IncludeTicketImage: false,
    IncludeQRCode: false,
    IncludeTicketName: false,
    IncludeDetails: false,
    IncludeTerms: false,
    IncludeSeatInfo: false,
    Template: null,
    BackgroundColorHex: null,
    FontColorHex: null,
    FontType: null
});
var Timezone = App.GraphObject.extend({
    Type: 'Timezone',
    CountryISO: null,
    Name: null,
    GMTOffset: 0,
    DSTOffset: 0,
    RawOffset: 0
});
var Transaction = App.GraphObject.extend({
    Type: 'Transaction',
    State: null,
    TransactionId: 0,
    ProviderType: null,
    ProviderReceipt: null,
    Amount: null,
    Message: null
});
var Twitter = App.ExternalInfo.extend({
    Type: 'Twitter'
});
var WebLink = App.GraphObject.extend({
    Type: 'WebLink',
    URL: null,
    Name: null,
    Description: null
});
var Wishlist = App.GraphObject.extend({
    Type: 'Wishlist',
    ProfileKey: null,
    Items: null
});
var YouTube = App.ExternalInfo.extend({
    Type: 'YouTube'
});

BWL.ModelEnum.AccessRequestResponseEnum = {
    Pending: 0,
    Rejected: 1,
    Accepted: 2
};
BWL.ModelEnum.AddressTypeEnum = {
    None: 0,
    Home: 1,
    Work: 2,
    Business: 3,
    BusinessContact: 4
};
BWL.ModelEnum.AuthSessionStateEnum = {
    None: 0,
    New: 1,
    Created: 2,
    ProvidersListed: 3,
    ThirdPartyURLRetrieved: 4,
    ThirdPartyDeclined: 5,
    Complete: 6,
    Ended: 7
};
BWL.ModelEnum.AuthSessionTypeEnum = {
    None: 0,
    Logon: 1,
    AddLogon: 2
};
BWL.ModelEnum.AuthTokenStateEnum = {
    None: 0,
    New: 1,
    LoggedOff: 2,
    LoggedIn: 3,
    Locked: 4
};
BWL.ModelEnum.CartStateEnum = {
    None: 0,
    New: 1,
    Open: 2,
    Pending: 3,
    Error: 4,
    Canceled: 5,
    Paid: 6,
    Processing: 7,
    Done: 10
};
BWL.ModelEnum.ContactRoleEnum = {
    None: 0,
    Self: 1,
    Owner: 2,
    Executive: 3,
    Director: 4,
    Manager: 5,
    Representative: 6,
    Agent: 7,
    Legal: 8,
    PR: 9,
    Label: 10,
    Distributor: 11,
    Media: 12,
    Assistant: 13,
    CopywriteInfringement: 14
};
BWL.ModelEnum.DomainProfileRoleEnum = {
    Public: 0,
    Authenticated: 10,
    Member: 20,
    Explicit: 30,
    StoreOwner: 40,
    Employee: 70,
    Service: 90,
    Administrator: 100,
    NoAccess: -1
};
BWL.ModelEnum.ExternalInfoEnum = {
    None: 0,
    Facebook: 1,
    LastFM: 2,
    LinkedIn: 3,
    MySpace: 4,
    Twitter: 5,
    YouTube: 6,
    Flickr: 7
};
BWL.ModelEnum.FacebookTypeEnum = {
    None: 0,
    Page: 1,
    Profile: 2
};
BWL.ModelEnum.GenderEnum = {
    None: 0,
    Female: 1,
    Male: 2,
    Other: 3
};
BWL.ModelEnum.ItemInfoEnum = {
    None: 0,
    GeneralAdmissionTicket: 100
};
BWL.ModelEnum.LastFMTypeEnum = {
    None: 0,
    Artist: 1,
    User: 2
};
BWL.ModelEnum.LinkedInTypeEnum = {
    None: 0,
    Profile: 1,
    Group: 2,
    Company: 3
};
BWL.ModelEnum.MessageLevelEnum = {
    Message: 0,
    Notify: 1,
    Error: 2
};
BWL.ModelEnum.MessageTypeEnum = {
    None: 0,
    Text: 1,
    HTML: 2
};
BWL.ModelEnum.ModelAccessTypeEnum = {
    Public: 0,
    ReadOnly: 1,
    ReadWrite: 15,
    FullAccess: 31,
    NoAccess: -1
};
BWL.ModelEnum.OrderStateEnum = {
    None: 0,
    New: 1,
    Processing: 2,
    Backordered: 3,
    Ordered: 4,
    Shipped: 5,
    Returned: 6,
    Fulfilled: 7,
    Closed: 8
};
BWL.ModelEnum.PaymentSessionStateEnum = {
    None: 0,
    New: 1,
    Pending: 2,
    Error: 3,
    Canceled: 4,
    Declined: 5,
    Approved: 6
};
BWL.ModelEnum.ServiceInvoiceItemStateEnum = {
    None: 0,
    Pending: 1,
    Invoiced: 2,
    Refunded: 3,
    Canceled: 4,
    Paid: 5
};
BWL.ModelEnum.ServiceInvoiceStateEnum = {
    None: 0,
    Pending: 1,
    Invoiced: 2,
    Refunded: 3,
    Canceled: 4,
    Paid: 5
};
BWL.ModelEnum.TransactionStateEnum = {
    None: 0,
    New: 1,
    Pending: 2,
    Error: 3,
    Canceled: 4,
    Declined: 5,
    Approved: 6
}; 