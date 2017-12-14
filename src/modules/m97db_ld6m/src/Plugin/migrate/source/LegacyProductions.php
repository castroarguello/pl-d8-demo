<?php

namespace Drupal\m97db_ld6m\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d6\Node as D6Node;
use Drupal\migrate\Row;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Provides a 'LegacyProductions' migrate source.
 *
 * @MigrateSource(
 *  id = "legacy_productions"
 * )
 */
class LegacyProductions extends D6Node {

  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = parent::fields();
    // Music Track Paragraphs.
    $fields['tracks'] = $this->t('Tracks Content Paragraphs');
    return fields;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    parent::prepareRow($row);
    $bso_values = $row->getSourceProperty('field_bso');
    $deserialized_data = [];
    foreach ($bso_values as $values) {
      $value = unserialize((string)$values['data']);
      $deserialized_data[] = $value['description'];
    }
    $row->setSourceProperty('tracks', $deserialized_data);
    return $row;
  }
}
