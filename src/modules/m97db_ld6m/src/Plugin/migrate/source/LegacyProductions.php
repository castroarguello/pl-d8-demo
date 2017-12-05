<?php

namespace Drupal\m97db_ld6m\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d6\Node as D6Node;

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
    return fields;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    $row = parent::prepareRow($row);
    return $row;
  }

}
