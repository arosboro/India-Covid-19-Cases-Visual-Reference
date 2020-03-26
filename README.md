# India-Covid-19-Cases-Visual-Reference

Always refer to Ministry of Health for official accounts of the latest statistics on your situation locally.
This data came from https://www.mohfw.gov.in/.  It was changed as follows to fit the geojson dataset, as District names change and are not always consistent between the Covid-19 report and the available mapping data.

The following Districts were renamed from the value on the left to the value on the right.  In cases where it created two reports from a district, the cases were added together.

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
