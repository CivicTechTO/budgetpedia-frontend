README.txt

staffing.json is from repositories/toronto/datasets/summary/json/staffing.json

expenditures.json is from repositories/toronto/datasets/expenditures/json/expenditures.json

stepwise processing is output on the console, leading to creation of csv files

see processinput.js for details

Henriks-MacBook-Pro:jsontocsv henrikbechmann$ node processinput.js
processing ./input/expenditure.json
writing ./output/expendituredata.json
writing ./output/flat.expenditure.adjusted.json
writing ./output/expenditure.adjusted.csv
writing ./output/flat.expenditure.nominal.json
writing ./output/expenditure.nominal.csv
processing ./input/staffing.json
writing ./output/staffingdata.json
writing ./output/flat.staffing.json
writing ./output/staffing.csv
Henriks-MacBook-Pro:jsontocsv henrikbechmann$