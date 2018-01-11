<?php

namespace Drupal\m97db_contact\Controller;

use Drupal\Core\Controller\ControllerBase,
    Drupal\Core\Cache\CacheableMetadata,
   Drupal\Core\Entity\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request,
    Symfony\Component\DependencyInjection\ContainerInterface,
  Symfony\Component\HttpFoundation\Response;

/**
 * Class ContactController.
 */
class ContactController extends ControllerBase {

  static public function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.manager')
    );
  }

  public function __construct(EntityManagerInterface $entity_manager) {
    $this->entityManager = $entity_manager;
  }

  public function getForm(Request $request) {
    $output = \Drupal::service('renderer')->renderRoot($build);
    
    $message = $this->entityManager()
    ->getStorage('contact_message')
    ->create(['contact_form' => 'us']);
    $form = $this->entityFormBuilder()->getForm($message);
    $css = '#header, .region-breadcrumb,#sidebar-first,.site-footer  { display:none; } #main {margin:0;} .path-contact-us {background: white;}
#page .messages__wrapper { font-size: 80%;padding: 0; } #page .messages { padding:0; }';
$form['#attached']['html_head'][] = [
[
      '#tag' => 'style',
      '#value' => $css,
   ], 'm97db'];
unset($form['actions']['preview']);
    return $form;
  }

}
