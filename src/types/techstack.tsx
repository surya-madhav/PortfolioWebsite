export interface TechStackItem {
    icon: string;
    category: string;
    name: string;
}

export interface TechStack {
    [name: string]: TechStackItem;
}
