<?php

namespace Drupal\m97db_contact\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\EventDispatcher\Event;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
 * Class DefaultSubscriber.
 */
class DefaultSubscriber implements EventSubscriberInterface {

  /**
   * Drupal\Core\Routing\CurrentRouteMatch definition.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $currentRouteMatch;

  /**
   * Constructs a new DefaultSubscriber object.
   */
  public function __construct(CurrentRouteMatch $current_route_match) {
    $this->currentRouteMatch = $current_route_match;
  }

  /**
   * {@inheritdoc}
   */
  static function getSubscribedEvents() {
    $events['kernel.response'][] = ['setHeaderContentSecurityPolicy'];
    return $events;
  }

  /**
   * This method is called whenever the kernel.response event is
   * dispatched.
   *
   * @param GetResponseEvent $event
   */
  public function setHeaderContentSecurityPolicy(Event $event) {
    $route_name = $this->currentRouteMatch->getRouteName();
    $response = $event->getResponse();
    $request = $event->getRequest();
    $path = $request->getPathInfo();
    if (strpos($path, '/contact-us') === 0) {
      $response->headers->remove('X-Frame-Options');
    }
    //$response->headers->set('X-Frame-Options', 'ALLOW-FROM 172.17.0.2', FALSE);
    //$response->headers->set('Content-Security-Policy', "default-src 'self' 172.17.0.2", FALSE);
  }

}
