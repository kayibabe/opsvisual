# RawData.xlsx Structure Analysis

## Summary
- **Total Rows**: 398 (including header)
- **Total Columns**: 222
- **Sheets**: DataEntry, Quarterly, Annual, LookUp
- **Data Categories**: 33 major groupings

## Data Zones (34 zones)
Balaka, Bangula, Chikwawa, Chiradzulu, Domasi, Jali, Kuchawe, Lirangwe, Liwonde, Luchenza, MUST, Machinga, Mangochi, Migowi, Mikolongwe, Miseu Folo, Monkey Bay, Mulanje, Muloza, Mwanza, Namadzi, Namwera, Nchalo, Neno, Ngabu, Nkando, Nkhudzi, Nsanje, Ntaja, Phalombe, Scheme, Thondwe, Thyolo, Zomba

## Key Data Sections

### 1. **RECORD DIMENSIONS** (Column A)
   - Zone
   - Scheme
   - Fiscal Year
   - Year
   - Month No
   - Month

### 2. **WATER PRODUCTION & NRW** (Columns H-K)
   - Volume Produced (m³)
   - Revenue Water (m³)
   - NRW (m³)
   - % NRW

### 3. **TREATMENT CHEMICALS** (Column V)
   - Chlorine kg
   - Alum kg
   - Soda Ash kg

### 4. **POWER** (Column AJ)
   - Power Usage kWh

### 5. **TRANSPORT & OPERATIONS** (Column AN)
   - Distances Covered km

### 6. **STAFFING** (Column AX)
   - Permanent Staff

### 7. **CONNECTIONS** (Columns BA-BY)
   - Individual Connections
   - Institutional Connections
   - Commercial Connections
   - CWP Connections
   - Aggregated Total Connections

### 8. **ACTIVE CONSUMERS** (Columns CI-CT)
   - Active Postpaid Individual
   - Active Postpaid Institutional
   - Active Postpaid Commercial
   - Active Postpaid CWP
   - Active Prepaid Individual
   - Active Prepaid Institutional
   - Active Prepaid Commercial
   - Active Prepaid CWP

### 9. **POPULATION SERVED** (Column CU)
   - Population in Supply Area

### 10. **STUCK METERS** (Columns CX-DM)
   - Institutional Stuck Meters
   - Commercial Stuck Meters
   - CWP Stuck Meters
   - Individual Stuck Meters
   - Aggregated Stuck Meters

### 11. **PIPE BREAKDOWNS** (Multiple columns)
   - PVC Breakdowns
   - GI (Galvanized Iron) Breakdowns
   - DI (Ductile Iron) Breakdowns
   - HDPE & AC Breakdowns

### 12. **PUMPS & SUPPLY HOURS** (Column FH)
   - Pump Breakdowns
   - Supply Hours

### 13. **DEVELOPMENT LINES** (Column FL)
   - Development Lines 32mm

### 14. **CASH COLLECTED** (Columns FR-GC)
   - Individual Postpaid
   - Institutional Postpaid
   - Commercial Postpaid
   - CWP
   - Prepaid
   - Other Revenue

### 15. **AMOUNTS BILLED** (Columns GC-GN)
   - Individual Postpaid
   - Institutional Postpaid
   - Commercial Postpaid
   - CWP
   - Total Billed

### 16. **SERVICE CHARGES** (Columns GN-GS)
   - Individual, Institutional, Commercial, CWP charges

### 17. **METER RENTAL** (Columns GS-GX)
   - Individual, Institutional, Commercial, CWP rental

### 18. **FINANCIAL KPIs** (Column GX)
   - Total Sales MWK

### 19. **CONNECTION PERFORMANCE** (Column HE)
   - Customers Applied for Connection
   - Customers Given Connection
   - Queries Received
   - Queries Resolved

### 20. **QUERY PERFORMANCE** (Column HL)
   - Queries metrics

## Key Metrics Available for Dashboard

### Production Metrics
- ✅ Volume Produced
- ✅ Revenue Water
- ✅ NRW Volume
- ✅ NRW %

### Customer Metrics
- ✅ Active Postpaid (Individual, Institutional, Commercial, CWP)
- ✅ Active Prepaid (Individual, Institutional, Commercial, CWP)
- ✅ Total Active Customers
- ✅ Population Served

### Collections & Billing
- ✅ Cash Collected (by type)
- ✅ Amounts Billed (by type)
- ✅ Collection Rate
- ✅ Billing Gap

### Operations
- ✅ Pipe Breakdowns (PVC, GI, DI, HDPE/AC)
- ✅ Pump Breakdowns
- ✅ Supply Hours
- ✅ Power Usage (kWh)
- ✅ Distances Covered

### Infrastructure
- ✅ New Connections (by type)
- ✅ Stuck Meters (by type)
- ✅ Development Lines

### Costs
- ✅ Power Costs
- ✅ Chemical Costs
- ✅ Staffing Costs
- ✅ Fuel Costs

### Performance
- ✅ Connection Applications
- ✅ Query Performance
- ✅ Service Charges
- ✅ Meter Rental

## Recommendations for Dashboard KPIs

Based on the available data, the dashboard can be enhanced with:

1. **Enhanced Production Panel**
   - Add "Revenue Water %" metric
   - Show trend of Revenue Water improvement

2. **Enhanced Customers Panel**
   - Break down by customer type (Postpaid Individual, Institutional, Commercial, CWP)
   - Show Prepaid vs Postpaid ratio

3. **New Connections Panel** (Currently shows only aggregated)
   - Break down by type (Individual, Institutional, Commercial, CWP)

4. **Enhanced Breakdowns Panel**
   - Show breakdown by pipe type (PVC, GI, DI, HDPE/AC)
   - Add Supply Hours metrics
   - Add Power Failure Hours

5. **New Service Quality Panel**
   - Supply hours consistency
   - Power failure metrics
   - Query resolution rate

6. **Enhanced Finance Panel**
   - Break down collections by customer type
   - Show Service Charges separately
   - Show Meter Rental separately

7. **New Infrastructure Panel**
   - Stuck meters by type and trend
   - Development lines progress

