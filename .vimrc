set nocompatible
set noerrorbells
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set nowrap
set number
set relativenumber
set noswapfile
set incsearch
set scrolloff=5
set hidden
set nobackup
set undodir=~/.vim/myundodir
set undofile

let &t_TI = ''
let &t_TE = ''

" For kitty (Background color)
let &t_ut=''

call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'

Plug 'mattn/emmet-vim'

call plug#end()

colorscheme gruvbox
set background=dark

let g:user_emmet_leader_key='<C-Z>'
