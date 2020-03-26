# India-Covid-19-Cases-Visual-Reference

Always refer to Ministry of Health for official accounts of the latest statistics on your situation locally.
This data came from https://www.mohfw.gov.in/.  It was changed as follows to fit the geojson dataset, as District names change and are not always consistent between the Covid-19 report and the available mapping data.

The following Districts were renamed from the value on the left to the value on the right.  In cases where it created two reports from a district, the cases were added together.

View the visualization at https://arosboro.github.io/India-Covid-19-Cases-Visual-Reference/

To generate new geojson:
1. Update the csv `IN/DistrictWiseList324.csv`. (I believe it's current as of March 24th 2019).
2. Run `$ node index.js` and if any records for the csv were not mapped to geojson features, they will be listed.
3. Add any missed records via mappings to the appropriate geojson feature, going off of the st_nm (State name), and district properties.
3. Re-run until the full dataset is represented.

To deploy on Map Box:

1. Upload the dataset (If it gets large, this may require use of the cli mapbox command.)
2. Export the dataset to a Tileset (You may repeat 1 and 2. as updates come out with the dataset).
3. Extend a style (I used monochrome) to include a data layer selected in MapBox studio that you created.
4. Add color stops (This visualization has 12) and adjust the color on a range for the property/field 'cases'
5. Update the access tokens and map references in doc/index.html
6. Deploy


```javascript
{
        'Vizag': 'Visakhapatnam',
        'MUNGER': 'Munger',
        'PATNA': 'Patna',
        'East Delhi': 'East',
        'North Delhi': 'North',
        'South Delhi': 'South',
        'West Delhi': 'West',
        'Bangalor Urban': 'Bangalore',
        'Bengaluru Urban': 'Bangalore',
        'Nellore': 'Sri Potti Sriramulu Nellore',
        'Ahmedabad': 'Ahmadabad',
        'Vishakhapatnam': 'Visakhapatnam',
        'Kalaburgi': 'Gulbarga',
        'Kutch': 'Kachchh',
        'Gurugram': 'Gurgaon',
        'Chikkaballapura': 'Chikmagalur',
        'Uttar Kannada': 'Uttara Kannada',
        'Kasargod': 'Kasaragod',
        'Mallapuram': 'Malappuram',
        'Thiruvanthpuram': 'Thiruvananthapuram',
        'Leh': 'Leh (ladakh)',
        'Ahmednagar': 'Ahmadnagar',
        'Mumbai Suburb': 'Mumbai Suburban',
        'Dakshin Kannada': 'Dakshina Kannada',
        'Raigad': 'Raigarh',
        'Khurda': 'Khordha',
        'SBS Nagar': 'Shahid Bhagat Singh Nagar',
        'SAS Nagar': 'Sahibzada Ajit Singh Nagar',
        'Jhunjhunu': 'Jhunjhunun',
        'Coimbatoor': 'Coimbatore',
        'Kanchipurum': 'Kancheepuram',
        'Tiruneveli': 'Tirunelveli',
        'Tirupur': 'Tiruppur',
        'Ranga Reddy': 'Rangareddy',
        'GB Nagar': 'GAUTAM BUDDHA NAGAR',
        'Kanpur': 'KANPUR NAGAR',
        'Moradabd': 'MORADABAD',
        'Philibhit': 'PILIBHIT',
        'North 24 Pargana': 'North 24 Parganas',
        'Warangal (U)': 'Warangal',
        'Medchal': 'Rangareddy',
        'Bhadradri Kothagudam': 'Uttara Kannada',
}
```

States were changes as follows:

```javascript
{
        'Delhi': 'NCT of Delhi',
        'J & K': 'Jammu & Kashmir',
        'Ladakh': 'Jammu & Kashmir',
        'Telangana': 'Andhra Pradesh',
}
```

The color pallete for the visualization was borrowed from Graphiq https://blog.graphiq.com/finding-the-right-color-palettes-for-data-visualizations-fcd4e707a283, though I have no affiliation with them.
