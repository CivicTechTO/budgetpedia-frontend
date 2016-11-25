README.txt

For each repositories/<repository>/datasets/<version>/

The file flow is through the following directories

Prepare intake files
m1-> [sources] (manual - create precursor sheet consisting of category columns, and one amount column)
m2-> [pending (manual)] - take precursor sheets and add metadata; make corrections) 
-> move to [intake] (source for automation)
a1.'node run preprocess' (to add codes and collect name_to_code data) maps (preprocess creates and updates name_to_code maps in [maps_names]; 

Develop dimension codes
m3-> make manual corrections to intake files where obvious issues occur; add codes to names (typically copy file from subsequent year to start)
a2.'node run count-names' to id and remove orphans)
m4-> remove lines that are no longer needed
a3.'node run map-codes' creates single code per names used in [maps_codes]; 
m5-> do manual change of names; 
a4.'node run continuity' creates charts showing discontinuation patterns in [continuity]; 
m6-> manual mapping of discontinued to later codes

Generate data files
a5.'node run prepare' to add reference year codes, creates single lookups for current year in [prepared] (ready to be used to create json file)
m7-> review and correct as necessary
6.'node run generate' to combine with meta and inflation history to produce json files, which merge years, to [json]
-> json (json files for consumption by front end)
-> lookups (single lookup files for each category - for reference year)
m8-> review and correct as necessary

[intake]
[preprocessed]
->[maps_names]
->[maps_codes]
->[continuity]
[prepared]
[json]

meta contains control files for the app

maps contains name/code lookups

dataseries contains supporing data series like inflation adjustment figures

correct coding and line items by changing maps_nodes, and rerunning preprocess (processing intake files)

correct names by rerunning map-codes, and changing names in map-codes files

correct allocations by changing continuity allocations, and rerunning prepare