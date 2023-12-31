PGDMP         1                {        	   messenger    14.4    14.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394 	   messenger    DATABASE     i   CREATE DATABASE messenger WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE messenger;
                postgres    false            �            1259    16410    Chats    TABLE       CREATE TABLE public."Chats" (
    id bigint NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    user1_id bigint NOT NULL,
    user2_id bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" time with time zone NOT NULL
);
    DROP TABLE public."Chats";
       public         heap    postgres    false            �            1259    16409    Chat_id_seq    SEQUENCE     v   CREATE SEQUENCE public."Chat_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Chat_id_seq";
       public          postgres    false    212                       0    0    Chat_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public."Chat_id_seq" OWNED BY public."Chats".id;
          public          postgres    false    211            �            1259    16427    Messages    TABLE     e  CREATE TABLE public."Messages" (
    text character varying(1000) NOT NULL,
    chat_id bigint NOT NULL,
    sender_id bigint NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    is_edited boolean DEFAULT false NOT NULL,
    id bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Messages";
       public         heap    postgres    false            �            1259    16446    Messages_id_seq    SEQUENCE     z   CREATE SEQUENCE public."Messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Messages_id_seq";
       public          postgres    false    213                       0    0    Messages_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Messages_id_seq" OWNED BY public."Messages".id;
          public          postgres    false    214            �            1259    16396    Users    TABLE     �  CREATE TABLE public."Users" (
    id bigint NOT NULL,
    username character varying(20) NOT NULL,
    password_hashed character varying(70) NOT NULL,
    ava_url text DEFAULT ''::text NOT NULL,
    blocked_users bigint[] DEFAULT ARRAY[]::bigint[] NOT NULL,
    active_chats bigint[] DEFAULT ARRAY[]::bigint[] NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16395    Users_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    210                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    209            j           2604    16413    Chats id    DEFAULT     g   ALTER TABLE ONLY public."Chats" ALTER COLUMN id SET DEFAULT nextval('public."Chat_id_seq"'::regclass);
 9   ALTER TABLE public."Chats" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            n           2604    16447    Messages id    DEFAULT     n   ALTER TABLE ONLY public."Messages" ALTER COLUMN id SET DEFAULT nextval('public."Messages_id_seq"'::regclass);
 <   ALTER TABLE public."Messages" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213            f           2604    16399    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210                      0    16410    Chats 
   TABLE DATA           ^   COPY public."Chats" (id, is_active, user1_id, user2_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   V!                 0    16427    Messages 
   TABLE DATA           s   COPY public."Messages" (text, chat_id, sender_id, is_deleted, is_edited, id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   {)                 0    16396    Users 
   TABLE DATA           �   COPY public."Users" (id, username, password_hashed, ava_url, blocked_users, active_chats, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �-                  0    0    Chat_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Chat_id_seq"', 141, true);
          public          postgres    false    211                       0    0    Messages_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Messages_id_seq"', 57, true);
          public          postgres    false    214                       0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 19, true);
          public          postgres    false    209            r           2606    16416    Chats Chat_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT "Chat_pkey" PRIMARY KEY (id);
 =   ALTER TABLE ONLY public."Chats" DROP CONSTRAINT "Chat_pkey";
       public            postgres    false    212            t           2606    16454    Messages Messages_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Messages" DROP CONSTRAINT "Messages_pkey";
       public            postgres    false    213            p           2606    16406    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    210            w           2606    16436    Messages chat    FK CONSTRAINT     �   ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT chat FOREIGN KEY (chat_id) REFERENCES public."Chats"(id) ON DELETE CASCADE;
 9   ALTER TABLE ONLY public."Messages" DROP CONSTRAINT chat;
       public          postgres    false    212    213    3186            x           2606    16441    Messages sender    FK CONSTRAINT     �   ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT sender FOREIGN KEY (sender_id) REFERENCES public."Users"(id) ON DELETE CASCADE;
 ;   ALTER TABLE ONLY public."Messages" DROP CONSTRAINT sender;
       public          postgres    false    210    213    3184            u           2606    16417    Chats user1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT user1 FOREIGN KEY (user1_id) REFERENCES public."Users"(id) ON DELETE CASCADE;
 7   ALTER TABLE ONLY public."Chats" DROP CONSTRAINT user1;
       public          postgres    false    212    210    3184            v           2606    16422    Chats user2    FK CONSTRAINT     �   ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT user2 FOREIGN KEY (user2_id) REFERENCES public."Users"(id) ON DELETE CASCADE NOT VALID;
 7   ALTER TABLE ONLY public."Chats" DROP CONSTRAINT user2;
       public          postgres    false    212    210    3184                 x�u�K�,)E��x�V!l0�XK�{o��k""3�RM�8I`_p���ߏ���̿y�����|�H��?9��qr=��:&�Gm�̛�t����V/F�R��j����L=kO��`Z���TcZ��čL�9Řb��d
���oi�9���:����N��&v�������LC^���,����z�6�\f��H;3�.����Yy#�K����g�Ԋ�L���|C�QtZ7��عq�`��4ƾN�@G�SB�Βd��H�sI̟TC{����f��3��Hb���̶�Z#�[�غ�,s3WJ<ɘ�?؃o�r1]��O,�=�>u�R�u�Xm����o�vw�@`�A^��'M��L������YC�q&����9�����(G2�V����v�U��d�{=�lf������H�A��k:|��-�����{~0�yn
� {pTN����O�B��"�=glĲVs"�oAb�mi��d�Z�T`{����)��V"`O��~{�᭎ ���������͔�Α��ߒ�s8ɍ��J�O�/�u�h��e3�5e�vy��`D����E�]�Gi�9l���)�����3�k��S]��;�G�e~c��+уAn#����&nF�.�͐��&��R߶�Q��ZY���V)>�4_Tj����Wg\z�z}�]_�|��uF\��R��SRu�ԏ��bP�������#SSL���:F*��H��������uFR~��>m��c}H5&�65��f�����,0u�6(P5J�����.�h¨2n�����j0p�$y0p)yU4d_'�R<n�j��=�M�u�
�������d4�n��C�6����T=/��r�!#4������0�2�o�|8�nFsH*Ń�#W_�?fZ ��=�7
�#����`����q����6_�.#��L��ͥn�h�(�@�G����t3����M�aOW3��>��W�o�Vy՛�(��i�{l\�� O�bH����*�f��d�O�	��m?_�M=L�(H�I�WBm|3����l=�u��7�jL��9�O��o�Hɒ[���n�73�t�|;�h��d�*�G����z3�L��o�\��B����c�
-C_��-]�{˿�ks�[�~�M�P�{g�����n����tK�X����FcN�����Rn�7���jS�
>ι��c>�*���f�c|��׷!�s�Ӫ�#*	�3����6c��ed|qϴV5��A���*�v��Q��y3����eYyvK9����WН���ժ��A��=:Vٷ��ڊP�D4�����b��o2�3�%���ƴ=���th����sf��10�wz���Ժ)[k���7�p��m��~��8^s� �tSQ����O��nTR���)Ɇ�~��T!{)�W�C���� ��t�FOf�
��TT`{�Q��=��@��)��9�ǟ�~ħ �,�T�ĭ=�Y��ph�P�vm�rCp[�kN����'i4}�s��<Z���N �㤽>��?�\z�7�/�%W8F�^�ENb��:�m�F!6�^0_+���Ҟ��^��dL�����c�*U��U�����(�P/�|`{��,��k��]�WLʱt�J>]̡�j9��:zCW>nY|��(G���>��A�^�(ǥYg���= dKoNf��u�u���)�ćM�4s���Q^I9��e2w����#qUBFE��atk�2��1�q��� �R]w��P=��y[��Q:�:D�Qr��5��KrQ:�M(4ҟ�H�h�(e���D۩�����"�S9ҞNb��M���Q\4�+���B�G1���&��f��`��?���5�O��4dj�u��J�M�^�v��G�.��p���ۅ���_נ�J(���lG���$�&73o���}L+��\���!>o�����|Né��R�������eec^T��Bc�S��齮q��с�E��(d��U3(N��\F�R��ɽ��@����3S�!�,�RR>
��oH�������8��-�         /  x����n#7�ϣ�Ƚ� ��;y�$�,�I���Fb��O�c�a�F�dόFb����/��8/���`a�4���܀ic���;����#�o�|��	�A{p2k���v��3�4P�����ό��\��:����
#��ˍ�4��J��޿���$r����H��#G�׾a1�;GGu�Z�� �z
ںT$� i4aD���"�Fm1���t>�/3&5p#:�����HeS�?�w�s6\�ڀ�j�����	}y�	�:���K�`�^CyU�=_��9���[�X-�ײn���U
(�X)P�}�~{~~^8�p0J�W��9d9f}-����S@��b���gX���M�Rp?vﻧ�ɵ�c�q��X2'h���ḻ���gy/�.�#�&'��H-����ׯʖ�նǜ�\h�הNR��^�7��7>��YR��k�YN�3r�{N��!���I�\�3���1�����'-AQoﻷ]�܂I���KA�̒z:>-�`g��!
�JR����uZ$I�SL[��U�0��b2��PM���$���} 7QlouV1���>*�k�!G��ѕ�b���8h"/0*Im$�Δw!Z�e*I}����[�u���K�}[J�X���v�ﯜ�`0�.r�]������=C\	��u��;K�۫ķ�)���7")l�>uy)k5��a�S�QU�6߲�F���j;I�9$s;�D+#_#P�G�-c-)�y�IS�#�z�s[� I*	'��|��&����÷F�3C0^`T�:iNkh��'�	{F-�4$7�{#�B����K7Fj�y����F%1#M��JF\W"kI�@i�vo�vB�x#���H��JS(�j��6�l[i���
�gR��5m�d��i=�������w�S _�%{���S)����I}�|�8�5��2I�EQo����b?{�N%���|����Z�/u1��_H��&ٙ;��NB@��W�˩������aL/(��Jrw��$	�?�C2j��O>�W�(>Β#a��5)I2��+�g6K�Q+���(�         !  x��Xɲ�H�]���\��F�������@� @ �z�<� @m��͋�W�Yٛ���n�s��q�|���[�o���W�u��rE_Z���L��0l���W�5��7^����$�l:F������? �7�п �;���ԑƐ��/�V|��?jW�`})�}�d3�f���<p��.3���$n�O��^�����|G�w>�0��7�/��~��f�����RGn�
��.�f"^�$�짋ݰ�C�#/�2;�n��9����"v��g��M_���6�yXM��U�[��K���&.��#����9/	n�<<��gxr�/��w=����3}A�Otf�1�3��W�<�00�N�O[�O��u�G�^Ij���H�����o ������G �?�����^~c:�+���᜿*�9���9�jFs�xA��ѡG<l]I,O�c�yfV����8����R�Wj?�_��!!�{�q�H������wd�p$q�[D���ub�jd�qP�c�D&4i^�k����5V��3�8�{-��:����A���s]P;�;�1
�3��>���G
ÿ�@��'������)�D{x�:��*���H0o�G���i���Ԩt1��~� ;�ϓC?& ��jO��6t��|2A��r�<Ǭ2*Ջ�k��|\�s|��}������N>mSf�z'>��_��#t?�:L���@�M�^6y��oEK|+���)��I��.wN�$|��щ��1c�[IB��H��M�p�I}�^6�W�J�5�'E��n�w9���P��}�z[�-�>Y�h<��Lq��"�Qَ<+A���#�z�*�]��z�=���
�J}��%��G9��+����+;��3�����8�Ot�=�-/�"��',YM}�7�N�W�a^/*��G�����m�J���i����&��}�#�ɂ��~�K�'�^��A����#�~�v���}r��+^��}�t�XO�r)�JULw��aV���S�D�Vx�q4VNx�%���m��Pէ�F��W�� �aL�d+gX�d���� ��x��v�E6������Z�,���Y�s����¥T2��R��|�Wy�2�
O��A��#�m�,��̗�U̞�n��BN]�*n��A�W��; �aX^bĜ�s��r�ě<Ǜ"�2L�{Ʋ&����g��?1�#��3<�G��\�Y��Xf�c�~�7[2��t��Ԟ�܌7�Q���%�3.��fm�J��r����~�Ǖc����[�q��1��~bL��L��=�{vͫTBt�?L��H�=��,���U`�MUTZW�R��Y�}�r����N�X1�䮴{�U(7>y�u"/�{UE�do�*�~��&��۫��w�������֜=���Vr�qP�UF)�`����������T�b�BnPs�/ar._���^r����.}�S
x>�ٖ�6\��f���N��(R]o�Tkk���� �lm��3�E��}�*�]8f�3�o��ڶP9������k[{������M�U]A3�,�ڌ�hD(_\=����+��nQ̇��g�R������-{�"��k�6����"��q���4{5Lۯ�͞��_#Rw�K��q�h�_[,�Ý�������]-�`�4iK�7�r֬<������p�ƹ�εnP�PޞӾ]�R҄��T�o�Բ����z�*Ŵf�	�S�����<��`W�l/ s��T	3� ��8��s������$�:xc�x�C��&�B"�0��=�{ X�����8��s �Fh���y���'ne��@����t��H͸ɵ	�W�>f���������R�h���9ܠ5�e��~�
�M�+��ŭ��!4w;�C~���^����Py�A�P���b�O��Q�sڴ��u%	-�h��Lʌtz�L�*�0v���X���<_&_������ē�(5��W!��r�	wL�]'�n�3ǒ�������fy3���Oq/�rc�s��cn��%Kboz�.%�ؔ$C��&̳�y�ە��R7@������8A����py��(�<�`���e��]�Xz=��5@YC�h�9�+~�LVK�5��5�*c��<�c�	����<==�h��6^7��!�������I�P�0��|Od�./y,�m����Օ�<+��*�&a�-o�C��ack�V0W3�I!3Fvn<S̪��.��FՄ����e�:O��Z��MU�p]�:�&�Y��V��lb�k$�B�\�5�z�~�S�.Bt΄��o%n��Sf�������� �k<�o�������V�C����QS��(r���s�� )Y 5�E�A!/u9�/���NE��9��L��w(�|0���<Ɲ*��X�6��c�Yq��n�
�����/G���\�)�����E�3(�T�ei�2��
�^q�u^A����^
��9o�X�yn��W^@���֣S�\Ζ*��*�+"I��3p�B��y�T�K9-s_�0�f���0i��U{��J�m��*�`EҨ&���O��\dV3��Sh�мx��	<:N2X���'"���e�T�� )	4��
4MyN6�*�I9������=���n�Юb����r���|(8h�-(�e�����!�7 ��$?�h6�1w�B�7��zܳ�Ln��� e�X飛�������݌|�a�)���n4���/�+���uu�mJr�V1�`:;���a�:��2W���j��'�M/1u���c��mY�Ϡf$�'5B�S��-Z�>�T�#*q��$T.]ms�;��伋t@d=�5�n�=HD��[����"�h�J�~��@�.��g7�8���>��$�b���L�)Q���Ίn��+�Tr
�jq��B��Y�e\�7鉣�p�54y�}��/�j�}!��ѭF]D��fQC�oӂ�3cS7�� 9'�X-���Ymu�m~%b��D����6Q��bU�@���L�'ڐ?�l'c����r�����贫��j��M��uwu��)*K쁜՝�_D�F�N��L���u�v;�]3\��ڣ�Q���0�ζ;B��$�(5��4q[H�y��r�9yz���5]��G^�����6dG�p��:l`]�	$�<���2Ya���X���\��,�U�RSe��5����3�Ϗ�.".�mW��A�/�{����I�8n���5^FVr��p�C9����p��e�,�Cթx$��B��+��y�C�l��D�<l����|����:w��36��6ybA���-����I�����C�5�K5o!k�+ϊ��W5�_�,-�蕢V���GX�#��
�DD �gU�w;$���[?T,B�t�B�d�V}�*�Q �Fz�qJ��Z'�Į�U��m7n�l	����:&�J�����~|���K�a<��T�ч�����ާcܵ�����������$��ĿR�+��[��	��	�K4j׷�O�`���;���7��]�~�����BY126d�`"C�SzFnq���k�	�z���I6���v�9�R�c�|�����맠��B}@#���m��>~����=�     