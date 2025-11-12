import { useState } from 'react';
import { Slider, Checkbox, Button, Input } from "@/components";
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    [key: string]: any;
  };
  onFilterChange: (filters: any) => void;
}

const categories = [
  { id: 'eletronicos', name: 'Eletrônicos', count: 120 },
  { id: 'jogos', name: 'Jogos', count: 85 },
  { id: 'acessorios', name: 'Acessórios', count: 64 },
  { id: 'perifericos', name: 'Periféricos', count: 42 },
  { id: 'hardware', name: 'Hardware', count: 31 },
];

const brands = [
  { id: 'sony', name: 'Sony', count: 45 },
  { id: 'microsoft', name: 'Microsoft', count: 38 },
  { id: 'nintendo', name: 'Nintendo', count: 29 },
  { id: 'razer', name: 'Razer', count: 27 },
  { id: 'logitech', name: 'Logitech', count: 22 },
];

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    onFilterChange({ ...filters, category: newCategories.join(',') });
  };

  const handleBrandChange = (brandId: string) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId];
    
    setSelectedBrands(newBrands);
    onFilterChange({ ...filters, brand: newBrands.join(',') });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    onFilterChange({
      ...filters,
      minPrice: value[0] ? value[0].toString() : '',
      maxPrice: value[1] ? value[1].toString() : '',
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    onFilterChange({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 py-6">
      <h3 className="font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const FilterCheckbox = ({ 
    id, 
    name, 
    count, 
    checked, 
    onChange 
  }: { 
    id: string; 
    name: string; 
    count: number; 
    checked: boolean; 
    onChange: (id: string) => void 
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={id} 
          checked={checked} 
          onCheckedChange={() => onChange(id)} 
        />
        <label 
          htmlFor={id} 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {name}
        </label>
      </div>
      <span className="text-sm text-gray-500">{count}</span>
    </div>
  );

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileFiltersOpen(true)}
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Mobile sidebar */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filtros</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar filtros</span>
              </Button>
            </div>

            <div className="mt-4 px-4 space-y-6">
              <FilterSection title="Preço">
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={5000}
                    step={10}
                    onValueChange={handlePriceChange}
                    className="my-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mínimo
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">R$</span>
                        </div>
                        <Input
                          type="number"
                          name="min-price"
                          id="min-price"
                          value={priceRange[0]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handlePriceChange([Number(e.target.value), priceRange[1]])
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Máximo
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">R$</span>
                        </div>
                        <Input
                          type="number"
                          name="max-price"
                          id="max-price"
                          value={priceRange[1]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handlePriceChange([priceRange[0], Number(e.target.value)])
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="Categorias">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <FilterCheckbox
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      count={category.count}
                      checked={selectedCategories.includes(category.id)}
                      onChange={handleCategoryChange}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Marcas">
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <FilterCheckbox
                      key={brand.id}
                      id={brand.id}
                      name={brand.name}
                      count={brand.count}
                      checked={selectedBrands.includes(brand.id)}
                      onChange={handleBrandChange}
                    />
                  ))}
                </div>
              </FilterSection>
            </div>

            <div className="mt-6 px-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filtros</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Limpar tudo
            </Button>
          </div>

          <FilterSection title="Preço">
            <div className="px-2">
              <Slider
                value={priceRange}
                min={0}
                max={5000}
                step={10}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="desktop-min-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mínimo
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <Input
                      type="number"
                      name="desktop-min-price"
                      id="desktop-min-price"
                      value={priceRange[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handlePriceChange([Number(e.target.value), priceRange[1]])
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="desktop-max-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Máximo
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <Input
                      type="number"
                      name="desktop-max-price"
                      id="desktop-max-price"
                      value={priceRange[1]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        handlePriceChange([priceRange[0], Number(e.target.value)])
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Categorias">
            <div className="space-y-3">
              {categories.map((category) => (
                <FilterCheckbox
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  count={category.count}
                  checked={selectedCategories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Marcas">
            <div className="space-y-3">
              {brands.map((brand) => (
                <FilterCheckbox
                  key={brand.id}
                  id={brand.id}
                  name={brand.name}
                  count={brand.count}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={handleBrandChange}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
