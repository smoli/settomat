<template>
    <h1>Wie gespielt wird</h1>

    <h2>Ziel des Spiels</h2>
    <p>
        Das Ziel des Spiels ist es in den dargestellten Karten ein <b>Set</b> von 3 Karten zu finden. Jedes gefunde Set
        wird
        entfernt und die freigewordenen Plätze werden vom Stapel mit neuen Karten aufgefüllt und eine neue
        <strong>Runde</strong>
        beginnt.
    </p>
    <p>
        Für jedes gefundene Set erhälst du Punkte. Hierzu beginnt mit jeder Runde ein <strong>Timer</strong> der von 120 Sekunden
        herunterzählt.
    </p>
    <p>
        Der Wert den der Timer beim finden eines Sets hat wird deinem Punktestand hinzugezählt.
    </p>
    <p>
        Liegst du falsch, so wird die Zeit auf dem Timer von deinem Punktekonto abgezogen.
    </p>

    <h2>Was ist ein Set?</h2>
    <p>
        Jede Karte bildet vier Eigenschaften ab:
    </p>
    <ul>
        <li>Form der Symbole: Raute, Pille, Welle</li>
        <li>Farbe der Symbole: Rot, Grün, Violett</li>
        <li>Füllung der Symbole: Leer, Schraffiert, Ausgefüllt</li>
        <li>Anzahl von Symbolen: Eins, zwei oder drei</li>
    </ul>
    <p>
        Jeder Kombination von Form, Farbe, Füllung und Anzahl gibt es genau einmal in dem Spiel. So ergeben sich 81
        Karten (3 * 3 * 3 * 3).
    </p>
    <p>
        Du kannst auch eine vereinfachte Variante spielen in der nur 27 Karten verwendet werden. Die Eigenschaft Füllung
        fällt bei dieser Variante weg und alle Karten zeigen nur voll ausgefüllte Symbole.
    </p>
    <p>
        <strong>Ein Set besteht aus 3 Karten für die für jede dieser Eigenschaften gilt: Alle Karten zeigen
        dasselbe oder alle Karten zeigen etwas Unterschiedliches an.</strong>
    </p>
    <h2>Beispiele:</h2>
    <div class="cards">
        <Card width="6em" height="10em"
              shape="0"
              color="0"
              filling="0"
              :count="1"
        />
        <Card width="6em" height="10em"
              shape="0"
              color="0"
              filling="0"
              :count="2"
        />
        <Card width="6em" height="10em"
              shape="0"
              color="0"
              filling="0"
              :count="3"
        />
        <p>Dies ist ein Set da alle Karten dieselbe Form (Pille), dieselbe Farbe (Rot), dieselbe Füllung (leer) zeigen,
            und jede Karte eine andere Anzahl von Symbolen, eins, zwei, drei zeigen.</p>
    </div>
    <div class="cards">
        <Card width="6em" height="10em"
              shape="0"
              color="0"
              filling="0"
              :count="1"
        />
        <Card width="6em" height="10em"
              shape="1"
              color="0"
              filling="0"
              :count="1"
        />
        <Card width="6em" height="10em"
              shape="2"
              color="0"
              filling="0"
              :count="2"
        />
        <p>Dies ist kein Set da alle Karten zwar Farbe und Füllung zeigen, und alle eine unterschiedliche Form,
            jedoch zwei Karten ein Symbol aber eine Karte zwei Symbole zeigen.</p>
    </div>
    <div class="cards">
        <Card width="6em" height="10em"
              shape="0"
              color="0"
              filling="0"
              :count="1"
        />
        <Card width="6em" height="10em"
              shape="1"
              color="1"
              filling="1"
              :count="2"
        />
        <Card width="6em" height="10em"
              shape="2"
              color="2"
              filling="2"
              :count="3"
        />
        <p>Dies ist ein Set, da alle Karten in allen Eigenschaften etwas unterschiedliches anzeigen. </p>
    </div>

    <h2>Wenn es kein Set gibt?</h2>
    <p>
        Es kann vorkommen, dass kein Set geformt werden kann. Wenn du denkst, dass dies der Fall ist, so kannst du
        durch Klick auf den Button <strong>Kein Set</strong> 3 weitere Karten hinzufügen. Hast du recht, und es gibt wirklich
        kein Set erhälst du auch dafür die Zeit die auf dem Timer steht als Punkte auf dein Konto.
    </p>
    <p>
        Doch vorsicht. Ob wirklich kein Set zu vorhanden ist, ist schwer zu erkennen. Liegst du falsch, bekommst du die
        Zeit die der Timer anzeigt von deinem Konto abgezogen.
    </p>

    <h3>Besondere Spielvariante mit garantiertem Set</h3>
    <p>
        Du kannst auch eine etwas einfacherere Variante spielen in der immer ein Set mit den ausgelegten Karten geformt werden kann.
    </p>

    <h2>Hinweise auf Sets</h2>
    <p>
        Kurz bevor der Timer abläuft erhälst du Hinweise, welche Karten ein Set bilden. 20 Sekunden vor Schluss wird eine Karte eines
        Sets mit einem Sternchen markiert. 10 Sekunden vor Schluss eine zweite Karte. Die dritte Karte des Sets ist dann leicht zu finden.
    </p>
    <Card width="6em" height="10em"
          shape="2"
          color="2"
          filling="2"
          :count="3"
          :tip="true"
    />

    <h2>Spielende</h2>
    <p>
        Das Spiel endet automatisch, wenn in den sichtbaren kein Set mehr gefunden werden kann und auf dem Stapel keine Karten
        mehr liegen.
    </p>
    <PatternDef/>

</template>

<script setup lang="ts">
//import { ref } from 'vue'
import Card from "./Card.vue";
import PatternDef from "./PatternDef.vue";
</script>

<style scoped>
p {
    width: 40em;
    margin-top: 0;
    margin-bottom: 1em;
}

h2 {
    margin-bottom: 1em;
}


div.cards {
    width: 40em;
    display: grid;
justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1em;
}

div.cards p {
    padding-top: 0.5em;
    grid-column: 1 / span 3;
}

ul {
    margin-left: 4em;
}
li {
    text-align: left;
}
</style>