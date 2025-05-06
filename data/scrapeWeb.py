from bs4 import BeautifulSoup
import requests
import json
import os
import sys


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

# Towers -----------------------------------------------------

# Units -----------------------------------------------------

# Consumables -----------------------------------------------------
targetURL = "https://tds.fandom.com/wiki/Units"
response = requests.get(targetURL, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    sections = []
    # list for section names
    sectionNamesWeb = soup.find_all("span", attrs={'class': 'mainheader'})
    # bo 1 cai dau do do la tua cua website
    for index, section in enumerate(sectionNamesWeb, start=1):
        if section.find('a'):
            sectionObject = {}
            sectionName = section.find('a').text
            sectionObject['name'] = sectionName
            # list for objects in each section
            items = []
            tableData = soup.find_all("tbody")[index-2]
            spans = tableData.find_all('span', attrs={'typeof': 'mw:File'})
            for span in spans:
                if span.find('a') and span.find('img'):
                    imgLink = span.find('img').get('data-src') or span.find('img').get('src')
                    obj = {'name': span.find('a').get('title'), 'img': imgLink}
                    items.append(obj)
            # luu vao sectionObject
            sectionObject['items'] = items
            # luu vao sections
            print(sectionObject)
            sections.append(sectionObject)
    
    
    
    # save in json file (./data/towers.json)
    with open('units.json', 'w') as json_file:
        json.dump(sections, json_file)
else:
    print(f"Failed to fetch page: {response.status_code}")
