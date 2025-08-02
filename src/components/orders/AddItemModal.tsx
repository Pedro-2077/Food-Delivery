import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Minus } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: ItemData) => void;
  orderId: number;
}

interface ItemData {
  quantidade: number;
  sabor: string;
  tamanho: string;
  preco_unitario: number;
}

const sabores = [
  'Margherita',
  'Pepperoni',
  'Quatro Queijos',
  'Calabresa',
  'Portuguesa',
  'Frango com Catupiry',
  'Vegetariana',
  'Bacon',
];

const tamanhos = [
  { label: 'Pequena', value: 'P', preco: 25.00 },
  { label: 'Média', value: 'M', preco: 35.00 },
  { label: 'Grande', value: 'G', preco: 45.00 },
  { label: 'Família', value: 'F', preco: 55.00 },
];

export const AddItemModal = ({ isOpen, onClose, onAdd, orderId }: AddItemModalProps) => {
  const [formData, setFormData] = useState<ItemData>({
    quantidade: 1,
    sabor: '',
    tamanho: '',
    preco_unitario: 0,
  });

  const handleTamanhoChange = (tamanho: string) => {
    const tamanhoData = tamanhos.find(t => t.value === tamanho);
    setFormData(prev => ({
      ...prev,
      tamanho,
      preco_unitario: tamanhoData?.preco || 0,
    }));
  };

  const handleQuantidadeChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantidade: Math.max(1, prev.quantidade + delta),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.sabor && formData.tamanho && formData.preco_unitario > 0) {
      onAdd(formData);
      setFormData({
        quantidade: 1,
        sabor: '',
        tamanho: '',
        preco_unitario: 0,
      });
      onClose();
    }
  };

  const total = formData.quantidade * formData.preco_unitario;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
            Adicionar Item ao Pedido
          </DialogTitle>
          <DialogDescription>
            Escolha o sabor, tamanho e quantidade do item
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sabor">Sabor</Label>
            <Select value={formData.sabor} onValueChange={(value) => setFormData(prev => ({ ...prev, sabor: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o sabor" />
              </SelectTrigger>
              <SelectContent>
                {sabores.map((sabor) => (
                  <SelectItem key={sabor} value={sabor}>
                    {sabor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tamanho">Tamanho</Label>
            <Select value={formData.tamanho} onValueChange={handleTamanhoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o tamanho" />
              </SelectTrigger>
              <SelectContent>
                {tamanhos.map((tamanho) => (
                  <SelectItem key={tamanho.value} value={tamanho.value}>
                    {tamanho.label} - R$ {tamanho.preco.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantidade</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantidadeChange(-1)}
                disabled={formData.quantidade <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[2rem] text-center">
                {formData.quantidade}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantidadeChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {formData.preco_unitario > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preço unitário:</span>
                <span>R$ {formData.preco_unitario.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quantidade:</span>
                <span>{formData.quantidade}x</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={!formData.sabor || !formData.tamanho}
            >
              Adicionar Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};