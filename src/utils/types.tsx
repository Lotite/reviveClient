export type Tinput = {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  type?: ToptionsInput;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  classInput?: string;
  classLabel?: string;
  classError?: string;
  onlyRead?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
  children?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TAccountError = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  keepSessions?: string;
};

export type TinputElements = {
  name?: HTMLInputElement;
  email?: HTMLInputElement;
  password?: HTMLInputElement;
  passwordConfirm?: HTMLInputElement;
  terms?: HTMLInputElement;
};

export type TinputsValue = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  terms?: boolean;
  remember?: boolean;
};

export type TerrorFromUser = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  terms?: string;
};

export type TcheckBox = {
  label?: string;
  id?: string;
  checked?: boolean;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement | null>;
  onChange?: (checked: boolean) => void;
  error?: string;
};
export type Trequest<T> = {
  success: boolean;
  message: string;
  data?: T;
  session?: Record<string, string>;
};

export type Tbutton = {
  color?: TtailwindColors["background"];
  children?: React.ReactNode;
  text?: string;
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export type ToptionsInput =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "name"
  | "terms";

export type TtailwindColors = {
  text:
    | "blue"
    | "orange"
    | "green"
    | "medium"
    | "white"
    | "success"
    | "error"
    | "warning"
    | "info";
  background: "blue" | "orange" | "green" | "dark" | "medium" | "medium2";
};

export type TmediaGallery = {
  id: number;
  title: string;
  portada: string;
  banner: string;
  description: string;
  reseña: number;
  date: string;
  number: number;
  type: "movie" | "serie" | "season" | "episodie";
  duracion?: number;
  clasificaion?: number;
  generos?: Array<string>;
  reparto?: Array<string>;
  director?: string;
};

export type Tdialog = {
  classContainer?: string;
  children?: React.ReactNode;
  onClose?: CallableFunction;
  onOpen?: CallableFunction;
  display?: "flex" | "hidden";
  backgrounColor?: TtailwindColors["background"];
};

export type Tgenero = {
  id: number;
  nombre_genero: string;
};

export type TrecomendationMedia = {
  medias: Array<TmediaGallery>;
  genero: Tgenero;
};

export type TdeviceType = "movil" | "ordenador";

// Tipo actualizado para dispositivos
export type Tdevice = {
  user_id: number;
  device_name: string;
  last_active_timestamp: string; // Usamos string para representar DateTime
  id: string;
  register_at: string; // Usamos string para representar DateTime
};
export type TdevicesList = Array<Tdevice>;


export type TpasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TprofileFormData = {
  name: string;
  email: string;
};


export type TabsContextType = {
  activeTab: string
  setActiveTab: (value: string) => void
}

export type TabsProps = {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export type TabsListProps = {
  children: React.ReactNode
  className?: string
}

export type TabsTriggerProps = {
  value: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

export type TabsContentProps = {
  value: string
  children: React.ReactNode
  className?: string
}
