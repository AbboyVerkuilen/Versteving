# Study Buddy – eisen (v3)

Dit document is het contract voor de bouw. Wijzigingen worden hier eerst vastgelegd.

## Doel

Een website waar studenten met een AI-tutor in gesprek gaan over een onderwerp. De tutor helpt de
student zelf te leren, volgens evidence-informed didactiek, en blijft binnen de aangeboden lesstof.

## Functionele eisen

### F1 Onderwerpen
- De beheerder maakt onderwerpen aan. Per onderwerp: naam, didactisch gedrag (`gedrag.md`),
  kennisdocumenten en instellingen.
- Eerst via bestanden (`topics/<onderwerp>/`), later via een beheeromgeving (fase 5).
- **Chats mogen niet afwijken van de lesstof.** Vragen buiten het onderwerp worden vriendelijk
  teruggeleid naar het onderwerp.

### F2 Chatinterface
- WhatsApp-achtige chat, mobile-first, met meerdere sessies per student per onderwerp.
- Duidelijk onderscheid: AI-berichten in een wit, breed vlak (ruimte voor grafieken en afbeeldingen);
  studentberichten in een gekleurde bubbel (HHS-groen, donkere tekst) op een rustige achtergrond.
- Huisstijl: HHS-kleuren (fel groen, donkerblauw) en vierhoeken met schuine zijdes.
- Eigen logo: schuine deur met spreekwolk, woordmerk "study buddy".
- Antwoorden komen woord voor woord binnen (streaming). Sessies krijgen automatisch een titel.
- Melding dat de student met een AI praat (AI Act, transparantie).

### F3 Dossier per student
- Eén dossier (markdown) **per onderwerp** per student, geen algemeen deel.
- Bijgewerkt na elke sessie; bekend in alle sessies van dat onderwerp.
- De student kan het dossier inzien en er opmerkingen bij plaatsen, maar niet wijzigen.
- Persoonsgegevens die de student zelf intypt, worden direct geanonimiseerd voordat ze in het
  dossier of de docentinzichten komen.

### F4 Kennis en bronnen
- Documenttypen: pdf, Word, PowerPoint, webpagina's, video-transcripties (± 20 per onderwerp).
- De lesstof is leidend. De AI verwijst naar documenten (bijv. "Reader H3, p. 12"), maar biedt
  documenten **niet** aan om te downloaden.
- Internet: de AI zoekt gericht naar informatie die bij het onderwerp past, ter ondersteuning van de
  lesstof. Online voorbeelden mogen worden aangepast zodat ze bij de lesstof passen.
- Slaat de uitleg uit de lesstof niet aan (ook niet na extra online voorbeelden), dan mag een betere
  online uitleg worden gebruikt.
- Altijd bronvermelding.

### F5 Visuals
- Grafieken van data of functies, processchema's en flowcharts, technische schetsen (krachten,
  doorsnedes, plattegronden) als SVG, wiskundige formules.
- Interactieve visuals (bijv. schuifje om een parameter in een formule te veranderen).
- Bestaande afbeeldingen van internet alleen na controle van de link, met bron en licentie.
- Geen AI-gegenereerde (fotorealistische) afbeeldingen.

### F6 Didactiek
- Per onderwerp in te stellen; standaard evidence-informed: retrieval practice, spaced repetition,
  socratisch eerst met hint-ladder, worked examples met fading, dual coding, elaboratie,
  metacognitie, beperkte cognitieve belasting, procesgerichte feedback.
- **Nooit het werk van de student overnemen**, maar helpen het zelf te doen.
- Vraagt de student om het antwoord en is er al op andere manieren hulp geboden, dan mag bij een klein
  tussenstapje het antwoord gegeven worden om frustratie te voorkomen. Soms is een voorbeeld uit
  een andere situatie beter.
- Actief oefenvragen en mini-quizzes aanbieden.
- Toon: informeel ("je"), geen emoji, altijd Nederlands op B2-niveau; niveau en woordkeus passen zich
  aan de student aan, behalve vakjargon uit de lesstof.
- Feedback over de AI: na elke derde output vraagt de AI expliciet om feedback, mits die output een
  significant antwoord bevat. Daarnaast 👍/👎 per antwoord.

### F7 Accounts en anonimiteit
- De student meldt zich aan met een klascode en krijgt een vooraf gegenereerde, anonieme naam en
  wachtwoord. Het account is alleen gekoppeld aan de klascode (en dus het cohort): volledig blind.
- De student legt een e-mailadres vast, alleen voor wachtwoordherstel. Er wordt alleen een hash
  (met geheime pepper) opgeslagen, nooit het adres zelf.
- Verwijderen van sessies of dossier: één bevestigingsscherm met uitleg over het belang van de data
  voor het onderwijs; daarna wordt echt verwijderd (AVG).

### F8 Tegoed en toegang
- Cohortperiodes: 25 augustus – 5 februari en 1 februari – 20 juli.
- Limieten per dag, week en maand; de daglimiet mag hoger zijn zolang het weekbudget niet op is.
- Student ziet tegoed in abstracte eenheden; de beheerder ziet euro's.
- Totaalplafond als noodrem: € 100.
- Tegoed op of periode voorbij: nieuwe gesprekken geblokkeerd, teruglezen mag.

### F9 Docentinzichten (beheerder)
- Live dashboard, alleen geaggregeerd en geanonimiseerd (k-anonimiteit, minimaal 5 studenten).
- Meest gestelde vragen, moeilijke concepten, misconcepties, gebruik in de tijd, gebruikte documenten.
- Kwaliteit van de AI (👍/👎, expliciete feedback, gevallen zonder bron).
- Signalen over hiaten in het materiaal, en wanneer online een betere uitleg beschikbaar is.
- Testmodus: de beheerder chat zelf als student met een onderwerp.
- Voorlopig één beheerder.

## Niet-functionele eisen

- **N1** Data en verwerking in de EU (productie). Lokaal testen met een niet-EU API alleen met
  testgesprekken, nooit met echte studenten.
- **N2** EU AI Act en AVG. De tutor beoordeelt niet: het dossier wordt nooit gebruikt voor cijfers of
  selectie. DPIA en afstemming met de privacy officer vóór gebruik met echte studenten.
- **N3** Goedkoop: eerst lokaal (Docker op Windows), daarna een eigen VPS; later opschalen.
- **N4** Taalmodel uitwisselbaar via configuratie (NVIDIA voor testen; EU-optie voor productie).
- **N5** Beoogd domein `study-buddy.hhs.nl` (aan te vragen bij HHS ICT; huisstijlgebruik afstemmen
  met communicatie).

## Fasering

1. Chat met sessies, onderwerp met documenten (RAG), web search, bronvermelding, strikt binnen de lesstof.
2. Dossier per onderwerp, didactisch profiel, oefenvragen, hint-ladder, feedbackvraag.
3. Visuals: grafieken, schema's, SVG-schetsen, formules, interactieve visuals, gecontroleerde afbeeldingen.
4. Accounts met klascode, cohortperiodes, tegoed in drie lagen, plafond.
5. Beheeromgeving: onderwerpen, testmodus, dashboard.

Eerste testonderwerp: het boek *Ontwerpen van Technische Innovaties*.
