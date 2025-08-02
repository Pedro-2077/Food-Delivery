import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderCard } from '@/components/orders/OrderCard';
import { AddItemModal } from '@/components/orders/AddItemModal';
import { useToast } from '@/hooks/use-toast';
import { Plus, LogOut, ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';

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

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 1,
        status: 'Pendente',
        preco: 80.00,
        itens: [
          {
            id: 1,
            quantidade: 2,
            sabor: 'Margherita',
            tamanho: 'M',
            preco_unitario: 35.00,
          },
          {
            id: 2,
            quantidade: 1,
            sabor: 'Pepperoni',
            tamanho: 'P',
            preco_unitario: 25.00,
          },
        ],
      },
      {
        id: 2,
        status: 'Finalizado',
        preco: 45.00,
        itens: [
          {
            id: 3,
            quantidade: 1,
            sabor: 'Quatro Queijos',
            tamanho: 'G',
            preco_unitario: 45.00,
          },
        ],
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateOrder = async () => {
    try {
      // Simulated API call
      const newOrder: Order = {
        id: orders.length + 1,
        status: 'Pendente',
        preco: 0,
        itens: [],
      };

      setOrders(prev => [newOrder, ...prev]);
      toast({
        title: "Pedido criado!",
        description: "Seu novo pedido foi criado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o pedido.",
        variant: "destructive",
      });
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'Cancelado' as const } : order
        )
      );
      toast({
        title: "Pedido cancelado",
        description: `Pedido #${orderId} foi cancelado.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cancelar o pedido.",
        variant: "destructive",
      });
    }
  };

  const handleFinalizeOrder = async (orderId: number) => {
    try {
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'Finalizado' as const } : order
        )
      );
      toast({
        title: "Pedido finalizado!",
        description: `Pedido #${orderId} foi finalizado com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o pedido.",
        variant: "destructive",
      });
    }
  };

  const handleAddItem = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsAddItemModalOpen(true);
  };

  const handleAddItemToOrder = async (itemData: any) => {
    if (!selectedOrderId) return;

    try {
      const newItem: OrderItem = {
        id: Date.now(), // Simple ID generation
        ...itemData,
      };

      setOrders(prev =>
        prev.map(order => {
          if (order.id === selectedOrderId) {
            const updatedItems = [...order.itens, newItem];
            const newPreco = updatedItems.reduce(
              (total, item) => total + item.quantidade * item.preco_unitario,
              0
            );
            return {
              ...order,
              itens: updatedItems,
              preco: newPreco,
            };
          }
          return order;
        })
      );

      toast({
        title: "Item adicionado!",
        description: "Item foi adicionado ao pedido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item.",
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pendente').length,
    completed: orders.filter(o => o.status === 'Finalizado').length,
    cancelled: orders.filter(o => o.status === 'Cancelado').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Food Delivery
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Olá, {user?.user_metadata?.nome || user?.email}
              </span>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Finalizados</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Order Button */}
        <div className="mb-6">
          <Button onClick={handleCreateOrder} variant="hero" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Novo Pedido
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Seus Pedidos</h2>
          
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancelOrder}
                  onFinalize={handleFinalizeOrder}
                  onAddItem={handleAddItem}
                  isAdmin={false} // Admin functionality can be added later
                />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <CardTitle className="mb-2">Nenhum pedido encontrado</CardTitle>
                <CardDescription className="mb-4">
                  Comece criando seu primeiro pedido
                </CardDescription>
                <Button onClick={handleCreateOrder} variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Pedido
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => {
          setIsAddItemModalOpen(false);
          setSelectedOrderId(null);
        }}
        onAdd={handleAddItemToOrder}
        orderId={selectedOrderId || 0}
      />
    </div>
  );
};

export default Dashboard;