type ClassValue = string | false | null | undefined | ClassValue[];

function flattenClasses(values: ClassValue[]): string[] {
  return values.flatMap((value) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return flattenClasses(value);
    }
    return [value];
  });
}

export function cn(...classes: ClassValue[]): string {
  return flattenClasses(classes).join(' ');
}

