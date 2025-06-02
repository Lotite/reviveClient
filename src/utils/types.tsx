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
  maxLength?: number;
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
  code?: HTMLInputElement;
};

export type TinputsValue = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  terms?: boolean;
  remember?: boolean;
  code?: string;
};

export type TerrorFromUser = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  terms?: string;
  code?: string;
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
  type: "movie" | "serie" | "season" | "episode";
  duracion?: number;
  clasificaion?: number;
  generos?: Array<string>;
  reparto?: Array<string>;
  director?: string;
  url?: string;
};

export type Tdialog = {
  classContainer?: string;
  children?: React.ReactNode;
  onClose?: CallableFunction;
  onOpen?: CallableFunction;
  constainerHeight?: string;
  constainerWidth?: string;
  display?: "flex" | "hidden";
  backgrounColor?: TtailwindColors["background"];
  scroll?:boolean
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


export type Tdevice = {
  user_id: number;
  device_name: string;
  last_active_timestamp: string;
  id: string;
  register_at: string; 
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
  inactiveClassName?: string,
  onClick?: () => void
}

export type TabsContentProps = {
  value: string
  children: React.ReactNode
  className?: string
}

export type LoadingContextType = {
  isLoading: boolean,
  sessionValidated?: boolean,
  showLoading: () => void
  hideLoading: () => void,
  setSessionValidated: (value: boolean) => void;
}


export type NotificationType = "info" | "success" | "warning" | "error"

export type Notification = {
  id: string
  message: string
  type: NotificationType
  title?: string
  duration?: number
}

export type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => string
  removeNotification: (id: string) => void
  clearNotifications: () => void
}


export type ConfirmOptions = {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "info" | "success" | "warning" | "error"
  onConfirm?: () => void
  onCancel?: () => void
}

export type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
  isOpen: boolean
  options: ConfirmOptions | null
  handleConfirm: () => void
  handleCancel: () => void
}

export type NotificationItemProps = {
  notification: Notification
  onRemove: (id: string) => void
}


export type recommendedMedia = {
  title?: string
  currentMedia?: TmediaGallery
  itemCount?: number
  className?: string
  gridCols?: string
  showBorder?: boolean
}

export type Step1EmailProps = {
  email: string;
  setEmail: (email: string) => void;
  handleSendCode: () => Promise<void>;
  isLoading: boolean;
  errors: { [key: string]: string };
}

export type Step2CodeProps = {
  code: string;
  setCode: (code: string) => void;
  handleVerifyCode: () => Promise<void>;
  handleResendCode: () => Promise<void>;
  isLoading: boolean;
  errors: { [key: string]: string };
  email: string;
  countdown: number;
}

export type Step3PasswordProps = {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  handleResetPassword: () => Promise<void>;
  isLoading: boolean;
  errors: { [key: string]: string };
}

export type TserieInfo = Array<Tseason> | [] | undefined

export type Tseason = {
  season:TmediaGallery,
  episodes:Array<TmediaGallery> | []
}

export type IndexViewProps = {
  requestRecomendation: () => Promise<Trequest<Array<TrecomendationMedia>>>;
  requestCarousel: () => Promise<Trequest<Array<TmediaGallery>>>;
}