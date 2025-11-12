(intro)=
# 2. Hoe werkt omvormen?  

## 2.1 Inleiding  

ls **Product Engineer** zorgen we er netjes voor dat bij normaal gebruik de spanningen dusdanig laag blijven,  
dat de optredende vervormingen klein zijn. Verplaatsing ten gevolge van doorbuiging is doorgaans (veel)  
minder dan 10% van de lengte van een balk en wordt vaak met behulp van een veiligheidsfactor ook nog  
verder verkleind. Bovendien zien we deze vervormingen dan het liefst weer volledig verdwijnen als de  
belasting verwijderd wordt.  

Als **Production Engineer** zijn we juist geïnteresseerd in grotere vervormingen. Aluminiumfolie wordt  
bijvoorbeeld van een ongeveer 50 cm dik blok eerst in meerdere stappen warmgewalst tot 5 mm dikte en  
vervolgens koudgewalst tot een folie van slechts 0,2 mm dik. De krachten en spanningen zijn daarbij hoog, maar  
niet zo hoog dat het onder de druk bezwijkt. Een enorme diktereductie, die alleen mogelijk is door het warme  
productieproces (boven de rekristallisatietemperatuur van aluminium) en de materiaaleigenschappen van deze  
aluminiumlegering.  

Titanium kennen we als een licht en sterk materiaal met een hoge weerstand tegen breken (kerftaaiheid) en  
ook als heel ductiel. Deze eigenschappen maken het “onverwoestbaar” en dus ook lastig om te produceren  
(zeker in combinatie met de hoge smelttemperatuur, de “lage” zelfontbrandingstemperatuur en de chemische  
reactie met het ijzer in stalen productiegereedschappen).  

We hebben allemaal wel eens een RVS paperclip verbogen en proberen terug te buigen. Bij een klein beetje  
verbuigen, buigt de paperclip gewoon terug. Bij meer verbuigen, veert de paperclip ook een beetje terug, maar  
niet helemaal. Terugbuigen op exact dezelfde plek is moeilijk. Overigens: bij te vaak heen en weer buigen  
breekt de paperclip door vermoeiing.  

**Centrale vragen in dit hoofdstuk**  

- Wat maakt dat sommige materialen uitermate geschikt zijn voor omvormen en andere niet?  
- Welke technische principes zijn hier aan het werk?  
- Welke technische variabelen horen daarbij?  

Dit hoofdstuk maakt een begin met het begrijpen van elastische en plastische vervorming en het vastleggen  
ervan, beginnend met het spanning-rekdiagram.  

*Figuur 2: Productie van aluminiumfolie – How it’s made video.*  
*Figuur 3: “Onverwoestbaar” titanium brillenframe, drukproef, en een titanium staaf gerekt tot twee keer zijn oorspronkelijke lengte.*

---

### Oefenvraag: materiaaleigenschappen onderzoek  

Zoek van:  

- een aluminiumlegering,  
- een gietstaallegering,  
- een warmwalsstaallegering,  
- een koolstofstaal en  
- een roestvaststaal  

de spanning-rekdiagrammen op.  

**Vraag:**  

- Welke verschillen zie je?  
- En hoe beïnvloedt dat de omvormbaarheid van het materiaal?  

---

### Bottom line question  

Een rib wordt vaak aangebracht om een onderdeel (lokaal) stijver te maken. De gegalvaniseerde stalen dakplaat  
heeft meerdere ribben. Aan jou, als Production Engineer, de taak om te bepalen hoe de **geoptimaliseerde vorm  
van de rib** eruit moet zien (plaatdikte, ribbreedte en -hoogte) als:

- de door het materiaal opgelegde maximale vervorming  
  \[
  \varepsilon_{\max} = 0{,}25
  \]
- de ware rek in de ribrichting  
  \[
  \varepsilon = 0
  \]
- en het volume van de plaat gelijk blijft.  

> NB: Voor verdere uitwerking van deze vraag zijn meer gegevens nodig over de geometrie van de  
> gevormde rib om tot één antwoord te komen. Ook de omvormtechniek speelt een rol; zwenkbuigen,  
> rolprofileren en matrijspersen zouden deze vorm kunnen realiseren.  
>  
> Een Product en Production Engineer (m.a.w. een Mechanical Engineer) moet in staat zijn om de  
> oplossingsruimte vast te stellen (welke combinatie van ribhoogte, -breedte en plaatdikte zijn mogelijk).

---

## 2.2 Spanning-rekdiagram (stress-strain curve)  

Het spanning-rekdiagram (ook wel trek-rekkromme, trekcurve of trekkromme) is een diagram waarin de  
spanning (stress) \(\sigma\) als gevolg van een trekkracht op een materiaal wordt uitgezet tegen de maatrek  
(engineering strain) \(\epsilon\) (relatieve rek), de verlenging als percentage van de oorspronkelijke lengte van de  
trekstaaf.  

Een dergelijke curve kan worden opgenomen met een trekbank. In een spanning-rekdiagram (zie Figuur 4)  
kunnen we vier fasen onderscheiden, van links naar rechts:

1. Elastisch gedrag  
2. Vloeiing  
3. Verstevigen  
4. Insnoering  

*Figuur 4: Nominale en ware spanning afgezet tegen de rek voor een ductiel materiaal (staal) – niet op schaal.*  

In Figuur 4 is ook aangegeven dat in het lineaire elastische deel:

\[
E = \frac{\sigma}{\epsilon}
\]

waar \(E\) de elasticiteitsmodulus is.

---

### Fase 1: Elastisch gedrag (elastic region)  

Spanning \(\sigma\) en rek \(\epsilon\) verhouden zich lineair ten opzichte van elkaar:

\[
\sigma = E \,\epsilon
\]

De bovengrens van dit gebied is de proportionaliteitsgrens \(\sigma_{pl}\) (*proportional limit*). Boven  
\(\sigma_{pl}\) kan een materiaal zich nog niet-lineair elastisch gedragen (verwaarloosbaar) tot de rekgrens.  

Als de spanning verwijderd wordt, veert het materiaal weer terug tot de oorspronkelijke staat.

---
