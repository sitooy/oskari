# URL parametrit

Kartan voi avata haluttuun tilaan URL parametreilla.

## coord=484288_6747852

Asettaa keskipisteen. X ja Y koordinaatti alaviivalla erotettuna. _Toimii vain yhdessä zoomLevel-parametrin kanssa._

## zoomLevel=9

Asettaa aloitus zoomaustason.
_Toimii vain yhdessä coord-parametrin kanssa._

## lang

Asettaa kielen, vaihtoehdot fi, sv ja en.

## addPoint

Arvolla 0 ei lisää valikkoon pisteen piirtotyökalua ja arvolla 1 lisää työkalun. Jos parametria ei anneta tai arvo on jokin muu kuin 0 tai 1 työkalu näytetään.

## addArea

Arvolla 0 ei lisää valikkoon alueen piirtotyökalua ja arvolla 1 lisää työkalun. Jos parametria ei anneta tai arvo on jokin muu kuin 0 tai 1 työkalu näytetään.

## addLine

Arvolla 0 ei lisää valikkoon viivan piirtotyökalua ja arvolla 1 lisää työkalun. Jos parametria ei anneta tai arvo on jokin muu kuin 0 tai 1 työkalu näytetään.

## addCircle

Arvolla 0 ei lisää valikkoon ympyrän piirtotyökalua ja arvolla 1 lisää työkalun. Jos parametria ei anneta tai arvo on jokin muu kuin 0 tai 1 työkalu näytetään.

## addEllipse

Arvolla 0 ei lisää valikkoon ellipsin piirtotyökalua ja arvolla 1 lisää työkalun. Jos parametria ei anneta tai arvo on jokin muu kuin 0 tai 1 työkalu näytetään.

## resolutions

Asettaa luettelo päätöslauselmia kartalla (kartta yksikköä kohden pikseliä) laskevassa järjestyksessä.

Kaava: `resolutions=[resolution1]_[resolution2]_[resolution3]`

Esim.: _resolutions=1000_50_0.5_

## municipality

Kuntanumero. Kolme numeroa etunollilla.

Esim.: _municipality=069_

# Hakemistorakenne

* lupapiste_map\oskari\applications\lupapiste\kartta Käyttöliittymä, lupapalvelu toteuttaa oman version
  * appsetup.json & config.json, kartan conffit
  * index.js kartan alustus + testitoiminnallisuutta
  * index.html contentMap ja mapdiv tärkeitä, kartta luodaan näiden sisälle. Div id kovakoodattu Oskariin.
  * hub.js, lupapalvelu tuo käyttöön
* lupapiste_map\oskari\bundles\lupapiste\bundle\lupakartta Lupapiste bundle, sisältää lupapistettä varten tehdyt ominaisuudet

# Karttatasot

Oletuksena kaikki ovat päällä.

* Taustakartta, id = "base_35" (MML taustakarttasarja)
* Kiinteistöjaotus, id = "90" (MML ktj_kiinteistorajat)
* Kiinteistötunnukset, id = "99" (MML ktj_kiinteistotunnukset)
* Asemakaava, id = "101" (GeoServer, lupapiste:Asemakaava)
* Kantakartta, id = "102" (GeoServer, lupapiste:Kantakartta)
* Suojellut alueet, id = "201"
* Pohjavesialueet, id = "202"
* Maaperä, id = "301"
* Kallioperä, id = "302"

## Tason poisto valitut tasot -listalta

Poistetaan id:t "102" ja "101" eli Kantakartta ja Asemakaava.
```javascript
hub.send("oskari-set-layers",
	[{ "name": "102", "action": "remove" }, { "name": "101", "action": "remove"}]
);
```

## Tason lisääminen valitut tasot -listaan

Lisätään listaan id:t "102" ja "101" eli Kantakartta ja Asemakaava. Asemakaava tulee heti näkyville, mutta Kantakarttaa ei. Käyttäjä voi käydä valitut tasot -listan kautta laittamassa tason näkyville.
```javascript
hub.send("oskari-set-layers",
	[{ "name": "102", "action": "add", "visible": "false" }, { "name": "101", "action": "add", "visible": "true"}]
);
```

## Tasojen näyttäminen ja piilottaminen

Laitetaan id "102" näkyville ja poistetaan id "101" näkyviltä. Molemmat pysyvät valitut tasot -listalla.
```javascript
hub.send("oskari-show-layers",
	[{ "name": "102", "visible": "true" }, { "name": "101", "visible": "false"}]
);
```

# Eventit

Toteutettu hub.js:n avulla.

## Kartalle lähetettävät

### map-clear-request

Poistaa kartalta markkerit

### map-draw-start

Käynnistää vektorien piirtotoiminnon, jossa käyttäjän oletetaan piirtävän kartalle jotain.

Piirtomoodi annetaan parametrina (drawmode). Mohdolliset moodit ovat 'point', 'line', 'area', 'box','circle','rectangle' ja 'ellipse'.

```javascript
hub.send("map-draw-start", {drawmode: 'area'});
```

### map-get-geometry-request

Tällä eventillä voi pyytää karttakomponentta lähetämään editointitilassa olevan geometrian. Karttakomponentti tekee se map-draw-done eventillä, eli samalla joka syntyy kun aina kun piirto lopetetaan.

### map-stop-editing-request

Lopettaa/laittaa pois päältä vektorien piirto/editointitoiminnon.

### oskari-show-shapes

Näytää kartalla WKT  muotoisia vektoreita. Parametrina menee geometria, tyyli ja halutaanko poistaa edelliset vektorit. Kaikki piirrokset tyhjennetään antamalla tyhjä geometria ja haluamalla poistaa edelliset vektorit. Geometriat eivät ole editoitavissa eikä ja ne voi vain poistaa. Tällä läyerilla on tarkoitus on vain näyttää geometrioita ja se on eri taso kuin piirto/editointilayer.

```javascript
hub.send("oskari-show-shapes", {
  clear : true,
  drawings : [ {
    id : "id",
    name : "name",
    description : "desc",
    category : 123,
	height: 5,
	area: 300,
 	geometry : "POLYGON((404241.539 6693842.301,404270.039 6693780.051,404331.289 6693829.301,404241.539 6693842.301))"
  } ]
});
```

### inforequest-map-start

Aloittaa piirtotoiminnon. Kartta tyhjennetään ennen piirron aloitusta, jos clear parametrin arvo on true. Klikkaus kartalle piirtää markkerin ja lähettää inforequest-map-click eventin.

### oskari-center-map

Piirtää documenttien markkerit kartalle. Kartta tyhjennetään ennen uusien markkereiden piirtoa, jos clear parametrin arvo on true. Keskittää kartan markkereihin ja asettaa zoomitason niin että kaikki näkyvät, kartalla näkyvän alueen minimikoko 1 x 1 km. Markkereita voi olla yksi tai useampia.

Markkerilla on id, sijainti, optionaalinen iconUrl ja mahdollisesti lista eventhandelereita ("mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur", "touchstart", "touchmove", "touchend", "keydown").

```javascript
hub.send("oskari-center-map",
  {clear : true,
    data: [ {
    id: new Date().getTime(),
    location: {x: parseInt(jQuery("#inputx").val(),10), y: parseInt(jQuery("#inputy").val(),10)},
    iconUrl: "/img/map-marker.png",
    events: {click: function(e) {jQuery("#eventMessages").html("click<br/>" + jQuery("#eventMessages").html())}}
  } ]
});
```

### map-update-size

Kertoo kartalle, että karttadivin koko on muuttunut. Kartan keskipiste ja zoomitaso pysyvät samoina.

## Kartan lähettämät

### oskari-map-initialized

Lähetetään kun kartta on latautunut.

### inforequest-map-click

Palauttaa tiedon käyttäjän osoittamasta pisteestä.
```javascript
hub.send("inforequest-map-click", {
    data : {
        location : {
            x : kuntatiedot.x,
            y : kuntatiedot.y
        }
    }
});
```

### oskari-save-drawings
karttakomponentti antaa tällä eventillä käyttäjän piirtämän geometrian. Event suntyy kun käyttäjä lopettaa piirtämisen tai kun karttakomponenttia on pyydetty palauttamaan geometria map-get-geometry-request eventillä. Piirretty geometria jää editointitilaan, editoinnin voi lopettaa map-stop-editing-request eventillä. Esimerkki:

```javascript
hub.send("oskari-save-drawings", {
  data : {
    drawings : drawings,
    applicationIid : this.applicationId
  }
});
```

# REST-rajapinta kunta-, avi-, ely- ja hallinto-oikeustietojen hakuun

_http://129.35.211.3:8080/lupapiste/rest/kunta?x=378184&y=6674481_
`{"kuntanimi_fi":"Espoo","kuntanimi_se":"Esbo","kuntanumero":"49"}`

_http://129.35.211.3:8080/lupapiste/rest/avi?kuntanro=49_
`{"AviNimi":"Etelä-Suomen AVI ","YmpLupaAviNimi":"Etelä-Suomen AVI ympäristölupa"}`

_http://129.35.211.3:8080/lupapiste/rest/ely?kuntanro=49_
`{"ElyNimi":"Uudenmaan ELY","KalatalousElyNimi":"Uudenmaan ELY kalatalous","LiikenneElyNimi":"Uudenmaan ELY liikenne ja infrastruktuuri","YmparistoElyNimi":"Uudenmaan ELY ympäristö ja luonnonvarat"}`

_http://129.35.211.3:8080/lupapiste/rest/ho?kuntanro=49_
`{"HONimi":"Helsingin hallinto-oikeus"}`

_http://129.35.211.3:8080/lupapiste/rest/aluejaot?x=378184&y=6674481_
`{"AVI":{"AviNimi":"Etelä-Suomen AVI ","YmpLupaAviNimi":"Etelä-Suomen AVI ympäristölupa"},"ELY":{"ElyNimi":"Uudenmaan ELY","KalatalousElyNimi":"Uudenmaan ELY kalatalous","LiikenneElyNimi":"Uudenmaan ELY liikenne ja infrastruktuuri","YmparistoElyNimi":"Uudenmaan ELY ympäristö ja luonnonvarat"},"HO":{"HONimi":"Helsingin hallinto-oikeus"},"Kunta":{"kuntanimi_fi":"Espoo","kuntanimi_se":"Esbo","kuntanumero":"49"}}`

# REST-rajapinta kiinteistötunnusten hakuun

## Pisteellä

_https://www-test.lupapiste.fi/proxy/property-id-by-point?x=404232.289&y=6693786.426&_=1448269356792_

tai

_https://www-test.lupapiste.fi/proxy/property-info-by-wkt?wkt=POINT(344178+6715373)_

## Viivalla

_https://www-test.lupapiste.fi/proxy/property-info-by-wkt?wkt=LINESTRING(343606+6715524%2C343712+6715500%2C343788+6715468%2C343826+6715582%2C343822+6715656%2C344032+6715716%2C344146+6715764)_

## Alueella

_https://www-test.lupapiste.fi/proxy/property-info-by-wkt?wkt=POLYGON((343838+6714869%2C344094+6714887%2C344142+6714991%2C344134+6714695%2C343876+6714675%2C343838+6714869))_

## Vastaus
```javascript
[{"rekisteriyksikkolaji":{"id":"1","selite":{"fi":"Tila","sv":"Lägenhet"}},"kiinttunnus":"22440900010212","x":"344509.186","y":"6715181.254"},{"rekisteriyksikkolaji":{"id":"1","selite":{"fi":"Tila","sv":"Lägenhet"}},"kiinttunnus":"22440900010255","x":"344054.817","y":"6714893.496"},{"rekisteriyksikkolaji":{"id":"1","selite":{"fi":"Tila","sv":"Lägenhet"}},"kiinttunnus":"22440900010246","x":"344250.722","y":"6715220.594"}]
```
