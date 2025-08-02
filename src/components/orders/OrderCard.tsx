import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingBag, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface OrderItem {
  id: number;
  quantidade: number;
  sabor: string;
  tamanho: string;
  preco_unitario: number;
}

interface Order {
  id: number;
  status: 'Pendente' | 'Cancelado' | 'Finalizado';
  preco: number;
  itens: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  onCancel?: (id: number) => void;
  onFinalize?: (id: number) => void;
  onAddItem?: (id: number) => void;
  isAdmin?: boolean;
}

export const OrderCard = ({ order, onCancel, onFinalize, onAddItem, isAdmin }: OrderCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente':
        return <Clock className="h-4 w-4" />;
      case 'Finalizado':
        return <CheckCircle className="h-4 w-4" />;
      case 'Cancelado':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'warning' as const;
      case 'Finalizado':
        return 'success' as const;
      case 'Cancelado':
        return 'destructive' as const;
      default:
        return 'secondary' as const;
    }
  };

  const canModifyOrder = order.status === 'Pendente';

  return (
    <Card className="shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
          <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
            {getStatusIcon(order.status)}
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Itens do Pedido</h4>
          {order.itens.length > 0 ? (
            <div className="space-y-2">
              {order.itens.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.sabor}</p>
                    <p className="text-sm text-muted-foreground">
                      Tamanho: {item.tamanho} • Qtd: {item.quantidade}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      R$ {item.preco_unitario.toFixed(2)} cada
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum item adicionado</p>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">R$ {order.preco.toFixed(2)}</span>
          </div>
        </div>

        {canModifyOrder && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddItem?.(order.id)}
              className="flex-1"
            >
              Adicionar Item
            </Button>
            <Button
              variant="warm"
              size="sm"
              onClick={() => onFinalize?.(order.id)}
              className="flex-1"
            >
              Finalizar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel?.(order.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};