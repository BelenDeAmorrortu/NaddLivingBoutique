export interface Color {
  id: string;
  nombre: string;
  foto: string;
  lqip: string;
  tipo_tela: string;
}

export interface Fabric {
  nombre: string;
  descripcion: string;
  id: string;
  colores: Color[];
}
