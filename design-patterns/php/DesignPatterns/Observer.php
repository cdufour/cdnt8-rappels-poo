<?php

namespace DesignPatterns;

/**
 * PHP expose des classes natives pour l' Observer pattern.
 * @link http://php.net/manual/en/class.splsubject.php
 * @link http://php.net/manual/en/class.splobserver.php
 *
 */

/**
 * Subjet: notifie les souscripteurs quand son state change
 */
class Source implements \SplSubject
{
    /**
     * @var int
     */
    public $state;

    /**
     * @var \SplObjectStorage Liste des souscripteurs.
     */
    private $observers;

    public function __construct()
    {
        $this->observers = new \SplObjectStorage();
    }

    /**
     * Souscription
     */
    public function attach(\SplObserver $observer): void
    {
        echo "Source: nouvel abonnement.\n";
        $this->observers->attach($observer);
    }

    public function detach(\SplObserver $observer): void
    {
        echo "Source: désabonnement.\n";
        $this->observers->detach($observer);
    }

    /**
     * Emet la notification à destination des abonnés
     */
    public function notify(): void
    {
        echo "Source: notifie les souscripteurs...\n";
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    public function demo(): void
    {
        echo "Source: changement.\n";
        $this->state = rand(0, 10);

        echo "Source: mon état a changé: {$this->state}\n";
        $this->notify();
    }
}

/**
 * Souscripteurs réagissant aux notifications de la source/sujet
 */
class ConcreteObserverA implements \SplObserver
{
    public function update(\SplSubject $source): void
    {
        if ($source->state < 3) {
            echo "ConcreteObserverA: a réagi à l'événement.\n";
        }
    }
}

class ConcreteObserverB implements \SplObserver
{
    public function update(\SplSubject $source): void
    {
        if ($source->state == 0 || $source->state >= 2) {
            echo "ConcreteObserverB: a réagi à l'événement.\n";
        }
    }
}

/**
 * Code client
 */

$source= new Source();

$o1 = new ConcreteObserverA();
$source->attach($o1);

$o2 = new ConcreteObserverB();
$source->attach($o2);

$source->demo();

