import {
  formatTagCategory,
  getTagCategory,
  TAG_CATEGORY_ORDER,
  type SchoolTag,
  type TagCategoryId,
} from "@/features/schools/tagTaxonomy";

export type TagCategoryGroup = {
  categoryId: TagCategoryId;
  label: string;
  tags: SchoolTag[];
};

export function groupTagsByCategory(tags: SchoolTag[]): TagCategoryGroup[] {
  const groups: TagCategoryGroup[] = [];

  for (const categoryId of TAG_CATEGORY_ORDER) {
    const categoryTags = tags.filter(
      (tag) => getTagCategory(tag.id) === categoryId,
    );

    if (categoryTags.length === 0) {
      continue;
    }

    groups.push({
      categoryId,
      label: formatTagCategory(categoryId),
      tags: categoryTags,
    });
  }

  return groups;
}
