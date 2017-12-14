<?php

/**
 * @file
 * Contains \Drupal\m97db_ld6m\Plugin\migrate\process\ParagraphMigrateProcessor.
 */

namespace Drupal\m97db_ld6m\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\migrate\Row;
use Drupal\node\Entity\Node;

/**
 * This plugin shows the contents of a field, then pushes it down the pipeline.
 *
 * @MigrateProcessPlugin(
 *   id = "paragraph_on_the_fly"
 * )
 */
class ParagraphMigrateProcessor extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    $paragraphs = [];
    if (!empty($value)) {
        // Create a new paragraph.
        $paragraph = Paragraph::create([
            'type' => 'track',
        ]);
        $paragraph->set('field_title', $value); 
        $paragraph->isNew();
        $paragraph->save();
        $paragraphs = [
          'target_id' => $paragraph->id(),
          'target_revision_id' => $paragraph->getRevisionId(),
        ];
    }
    return $paragraphs;
  }

}
