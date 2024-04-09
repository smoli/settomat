<template>
    <h1>Wie gespielt wird</h1>

    <section>

        <h2>Ziel des Spiels</h2>
        <p>
            Das Ziel des Spiels ist es, so viele Punkte wie möglich zu erreichen, in dem du in den ausgelegten Karten
            <b>Sets</b> von 3 Karten findest. Hierzu klickst
            du drei Karten, von denen du denkst, dass sie ein Set bilden an. Jedes gefundene Set wird entfernt und die
            freigewordenen Plätze werden vom Stapel mit neuen Karten aufgefüllt und eine neue
            <strong>Runde</strong> beginnt.
        </p>
    </section>

    <section>

        <h2>Was ist ein Set?</h2>
        <p>
            Jede Karte bildet vier Eigenschaften ab:
        </p>
        <ul>
            <li>Form der Symbole: Raute, Pille, Welle</li>
            <li>Farbe der Symbole: Rot, Grün, Violett</li>
            <li>Füllung der Symbole: Leer, schraffiert, ausgefüllt</li>
            <li>Anzahl von Symbolen: Eins, zwei oder drei</li>
        </ul>
        <p>
            Jede Kombination von Form, Farbe, Füllung und Anzahl gibt es genau einmal in dem Spiel. So ergeben sich 81
            Karten (3 * 3 * 3 * 3).
        </p>
        <p>
            Du kannst auch eine vereinfachte Variante spielen, in der nur 27 Karten verwendet werden. Die Eigenschaft
            Füllung
            fällt bei dieser Variante weg und alle Karten zeigen nur voll ausgefüllte Symbole.
        </p>
        <p>
            <strong>Ein Set besteht aus 3 Karten für die für jede dieser Eigenschaften gilt: Alle Karten zeigen
                dasselbe oder alle Karten zeigen etwas Unterschiedliches an.</strong>
        </p>
    </section>

    <section>

        <h2>Beispiele:</h2>
        <div class="cards">
            <Card width="6em" height="10em"
                  :shape="0"
                  :color="0"
                  :filling="0"
                  :count="1"
            />
            <Card width="6em" height="10em"
                  :shape="0"
                  :color="0"
                  :filling="0"
                  :count="2"
            />
            <Card width="6em" height="10em"
                  :shape="0"
                  :color="0"
                  :filling="0"
                  :count="3"
            />
            <p>Dies ist ein Set, da alle Karten dieselbe Form (Pille), dieselbe Farbe (Rot), dieselbe Füllung (leer)
                zeigen,
                und jede Karte eine andere Anzahl von Symbolen, eins, zwei, drei zeigen.</p>
        </div>
        <div class="cards">
            <Card width="6em" height="10em"
                  :shape="0"
                  :color="0"
                  :filling="0"
                  :count="1"
            />
            <Card width="6em" height="10em"
                  :shape="1"
                  :color="0"
                  :filling="0"
                  :count="1"
            />
            <Card width="6em" height="10em"
                  :shape="2"
                  :color="0"
                  :filling="0"
                  :count="2"
            />
            <p>Dies ist kein Set, da alle Karten zwar die gleiche Farbe und Füllung zeigen, und alle eine
                unterschiedliche Form,
                jedoch zwei Karten ein Symbol zeigen aber eine Karte zwei Symbole zeigt.</p>
        </div>
        <div class="cards">
            <Card width="6em" height="10em"
                  :shape="0"
                  :color="0"
                  :filling="0"
                  :count="1"
            />
            <Card width="6em" height="10em"
                  :shape="1"
                  :color="1"
                  :filling="1"
                  :count="2"
            />
            <Card width="6em" height="10em"
                  :shape="2"
                  :color="2"
                  :filling="2"
                  :count="3"
            />
            <p>Dies ist ein Set, da alle Karten in allen Eigenschaften etwas unterschiedliches anzeigen. </p>
        </div>
    </section>

    <section>
        <h2>Wie erhalten ich Punkte für Sets</h2>
        <p>
            Mit Beginn jeder Runde startet ein <strong>Timer</strong> der von 120 Sekunden herunterzählt.
            Für jedes gefundene Set erhälst die verbleibenden Sekunden auf dem Timer als Punkte. Je schneller
            du also das Set findest, desto mehr Punkte erhälst du.
        </p>
        <p>
            Liegst du jedoch falsch und die drei von dir ausgewählten Karten bilden kein Set, wird die Zeit auf dem
            Timer von deinem Punktekonto abgezogen.
        </p>
    </section>

    <section>
        <h2>Wenn es kein Set gibt?</h2>
        <p>
            Es kann vorkommen, dass kein Set geformt werden kann. Wenn du denkst, dass dies der Fall ist, kannst du
            durch Klick auf den Button <strong>Kein Set</strong> 3 weitere Karten hinzufügen. Hast du recht, und es gibt
            wirklich
            kein Set erhälst du auch dafür die Zeit die auf dem Timer steht als Punkte auf dein Konto.
        </p>
        <p>
            Doch vorsicht. Ob wirklich kein Set zu vorhanden ist, ist schwer zu erkennen. Liegst du falsch, bekommst du
            die
            Zeit die der Timer anzeigt von deinem Konto abgezogen.
        </p>
    </section>
    <section>
        <h2>Besondere Spielvariante mit garantiertem Set</h2>
        <p>
            Du kannst auch eine etwas einfacherere Variante spielen in der sich in den ausgelegten Karten immer ein Set
            befindet.
        </p>
    </section>

    <section>

        <h2>Hinweise auf Sets</h2>
        <p>
            Kurz bevor der Timer abläuft erhälst du Hinweise, welche Karten ein Set bilden. 20 Sekunden vor Schluss wird
            eine Karte eines
            Sets mit einem Sternchen markiert. 10 Sekunden vor Schluss eine zweite Karte. Die dritte Karte des Sets ist
            dann leicht zu finden.
        </p>
        <div class="cards one-card">
            <Card width="6em" height="10em"
                  :shape="2"
                  :color="2"
                  :filling="2"
                  :count="3"
                  :tip="true"
            />
        </div>
    </section>

    <section>

        <h2>Spielende</h2>
        <p>
            Das Spiel endet automatisch, wenn in den ausgelegten Karten kein Set mehr gefunden werden kann und auf dem
            Stapel
            keine Karten mehr liegen.
        </p>
    </section>
    <PatternDef/>

</template>

<script setup lang="ts">
//import { ref } from 'vue'
import Card from "./Card.vue";
import PatternDef from "./PatternDef.vue";
</script>

<style scoped>
section {
    display: block;
    background: white;
    margin-bottom: 2em;
    border-radius: 1em;
    padding: 0em 1em 1em 1em;
    box-shadow: 0.1em 0.1em 0.21em rgba(0, 0, 0, 0.3);
    text-align: left;
    max-width: 50em;
}


p {
    display: block;
    margin-top: 0;
    margin-bottom: 1em;
}

h2 {
    margin-bottom: 1em;
    display: block;
    text-align: center;
}


div.cards {
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1em;

}

div.one-card {
    grid-template-columns: 1fr;
}

div.cards p {
    padding-top: 0.5em;
    grid-column: 1 / span 3;
}

ul {
    margin-left: 2em;
}

li {
    text-align: left;
}

.card {
    border: 1px solid lightgray;
}

@media (max-width: 600px) {
    section {
        max-width: 90vw;
    }
    ul {
        margin-left: 1em;
    }
}

</style>