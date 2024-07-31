export interface FlatCategory {
  [key: string]: string | number | FlatCategory[] | null;
  id: string;
  name: string;
  parent: string | null;
  hierarchy_level: number;
  classification: "FP" | "SL";
}

export interface Category extends FlatCategory {
  sub_categories: Category[];
}

export const categories: Category[] = [
  {
    id: "34af6c9c-add3-4561-a56a-ed69ca0df431",
    name: "Potatoes",
    classification: "FP",
    parent: null,
    sub_categories: [
      {
        id: "2eb9cd00-d099-4d7a-8e23-c5191829306f",
        name: "Irish Potatoes",
        classification: "FP",
        parent: "34af6c9c-add3-4561-a56a-ed69ca0df431",
        sub_categories: [
          {
            id: "96e3708a-89f2-40ec-9173-1a5940ec4dse",
            name: "Cow Shed Cleaners",
            classification: "FP",
            parent: "222989e8-3f7f-459c-8479-49911bce2899",
            sub_categories: [],
            hierarchy_level: 1,
          },
        ],
        hierarchy_level: 1,
      },
    ],
    hierarchy_level: 0,
  },
  {
    id: "1ee397cc-f918-41a0-8a14-0d3c1f0a3b73",
    name: "Herbs and spices",
    classification: "FP",
    parent: null,
    sub_categories: [],
    hierarchy_level: 0,
  },
  {
    id: "222989e8-3f7f-459c-8479-49911bce2899",
    name: "Cleaners",
    classification: "SL",
    parent: null,
    sub_categories: [
      {
        id: "96e3708a-89f2-40ec-9173-1a5940ec4fdb",
        name: "Cow Shed Cleaners",
        classification: "SL",
        parent: "222989e8-3f7f-459c-8479-49911bce2899",
        sub_categories: [],
        hierarchy_level: 1,
      },
    ],
    hierarchy_level: 0,
  },
  {
    id: "dd77de24-2008-4843-9e13-eea924c932bd",
    name: "Cereals and Grains",
    classification: "FP",
    parent: null,
    sub_categories: [],
    hierarchy_level: 0,
  },
  {
    id: "4573edbf-b256-48d0-b157-61681e98fedf",
    name: "Cars",
    classification: "SL",
    parent: null,
    sub_categories: [],
    hierarchy_level: 0,
  },
  {
    id: "e2f14c36-a5fe-4945-9427-568dfffe5dfb",
    name: "Berries and Nuts",
    classification: "FP",
    parent: null,
    sub_categories: [],
    hierarchy_level: 0,
  },
  {
    id: "323abe65-5e48-47d8-b5ad-8f2730d77d6e",
    name: "Animal Products",
    classification: "FP",
    parent: null,
    sub_categories: [
      {
        id: "69a9a328-ecbd-4cfd-b120-4d00f30130c7",
        name: "Dairy Products",
        classification: "FP",
        parent: "323abe65-5e48-47d8-b5ad-8f2730d77d6e",
        sub_categories: [],
        hierarchy_level: 1,
      },
    ],
    hierarchy_level: 0,
  },
];

export function traverseSubCategories(
  category: Category[] | Category
): FlatCategory[] {
  if (Array.isArray(category)) {
    return category
      .map((category) => {
        return [
          Object.keys(category)
            .filter((k) => k !== "sub_categories")
            .reduce((acc, curr) => ({ ...acc, [curr]: category[curr] }), {}),
          ...traverseSubCategories(category),
        ];
      })
      .flat();
  }

  return traverseSubCategories(category.sub_categories);
}
